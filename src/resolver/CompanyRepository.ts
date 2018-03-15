import {Db} from "mongodb";
import {Company} from "./Company";

export class CompanyRepository {
    constructor(private readonly db: Db) {
    }

    public async getCompanyByUsername(username: string): Promise<Company> {
        let companyData = await this.db.collection('User').findOne({username, role: 'company'});
        if (companyData === null)
            return null;
        return new Company(companyData);
    }

    public async getCompanyById(id: string): Promise<Company> {
        let companyData = await this.db.collection('User').findOne({_id: id, role: 'company'});
        if (companyData === null) {
            return null;
        }
        return new Company(companyData);
    }
}

