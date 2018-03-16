import {Database} from "../../services/Database";
import {Internship} from "../Internship";
import {ObjectID} from "bson";

export class InternshipRepository {
    public constructor(private readonly db: Database) {
    }

    public async getAll(): Promise<Internship[]> {
        const internships = await this.db.getDatabase().collection('Internships').find().toArray();
        return internships.map(i => new Internship(i));
    }

    public async getById(id: string | ObjectID): Promise<Internship> {
        const data = await this.db
            .getDatabase()
            .collection('Internships')
            .findOne({_id: id});

        if (data === null)
            return null;
        return new Internship(data);
    }

    public async persist(internship: Internship): Promise<Internship> {
        await this.db.getDatabase().collection('Internships').updateOne({_id: internship.id}, internship.serialize());
        return this.getById(internship.id);
    }

    public async create(internship: Internship): Promise<Internship> {
        let {insertedId} = await this.db.getDatabase().collection('Internships').insertOne(internship.serialize());
        return await this.getById(insertedId);
    }
}