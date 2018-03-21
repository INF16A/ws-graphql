import {Database} from "../../services/Database";
import {Company} from "../Company";
import {ObjectID} from "bson";

export class CompanyRepository {
    public constructor(private readonly db: Database) {
    }

    public async getAllCompanies(): Promise<Company[]> {
        const companies = await this.db.getDatabase().collection('User').find({role: 'company'}).toArray();
        return companies.map(data => new Company(data));
    }

    public async getCompanyById(id: string | ObjectID): Promise<Company> {
        if(typeof id === 'string') {
            id = new ObjectID(id);
        }
        const data = await this.db
            .getDatabase()
            .collection('User')
            .findOne({
                _id: id,
                role: 'company'
            });
        if (data === null)
            return null;
        return new Company(data);
    }

    public async getCompanyByUsername(username: string): Promise<Company> {
        const data = await this.db
            .getDatabase()
            .collection('User')
            .findOne({
                username,
                role: 'company'
            });
        if (data === null)
            return null;
        return new Company(data);
    }

    public async persist(company: Company): Promise<Company> {
        await this.db
            .getDatabase()
            .collection('User')
            .updateOne({_id: company.id}, {$set: company.serialize()});
        return this.getCompanyById(company.id);
    }

    public async create(company: Company): Promise<Company> {
        let {insertedId} = await this.db
            .getDatabase()
            .collection('User')
            .insertOne(company.serialize());
        return this.getCompanyById(insertedId);
    }
}