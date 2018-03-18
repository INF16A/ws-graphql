import {Database} from "../../services/Database";
import {Internship} from "../Internship";
import {ObjectID} from "bson";
import {Location} from "../Location";

export class InternshipRepository {
    private readonly INTERNSHIP_COLLECTION: string = 'Internships';

    public constructor(private readonly db: Database) {
    }

    public async getAll(): Promise<Internship[]> {
        const internships = await this.db.getDatabase().collection(this.INTERNSHIP_COLLECTION).find().toArray();
        return internships.map(i => new Internship(i));
    }

    public async getById(id: string | ObjectID): Promise<Internship> {
        if (typeof id === 'string') {
            id = new ObjectID(id);
        }
        const data = await this.db
            .getDatabase()
            .collection('Internships')
            .findOne({_id: id});

        if (data === null)
            return null;
        return new Internship(data);
    }

    public async remove(internship: Internship): Promise<Boolean> {
        const result = await this.db.getDatabase().collection(this.INTERNSHIP_COLLECTION).deleteOne({_id: internship.id});
        return result.result.ok === 1;
    }

    public async persist(internship: Internship): Promise<Internship> {
        await this.db.getDatabase().collection(this.INTERNSHIP_COLLECTION).updateOne({_id: internship.id}, internship.serialize());
        return this.getById(internship.id);
    }

    public async create(internship: Internship): Promise<Internship> {
        let {insertedId} = await this.db.getDatabase().collection(this.INTERNSHIP_COLLECTION).insertOne(internship.serialize());
        return await this.getById(insertedId);
    }

    public async getNear(location: Location, distanceKm: number): Promise<Internship[]> {
        const data = await this.db
            .getDatabase()
            .collection(this.INTERNSHIP_COLLECTION)
            .find({
                "address.location": {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [location.lat, location.long]
                        },
                        $maxDistance: distanceKm * 1000
                    }
                }
            }).toArray();
        return data.map(d => new Internship(d));
    }
}