import {Db} from "mongodb";
import {Company} from "./Company";

export class CompanyRepository {
    constructor(private readonly db: Db) {
    }

    public async getCompanyByUsername(username: string): Promise<{ exists: Boolean, company: Company }> {
        let data = await this.db.collection('User').findOne({username});
        if (data == null) {
            return {exists: false, company: null};
        }
        return {exists: true, company: new Company(data)};
    }
}

