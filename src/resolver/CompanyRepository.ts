import {Db} from "mongodb";
import {Company} from "./Company";

export class CompanyRepository {
    public static async doesCompanyExist(db: Db, id: string): Promise<Boolean> {
        return null != await db.collection('User').findOne({role: 'company', _id: id});
    }

    public static async getCompanyById(db: Db, id: string): Promise<{ exists: Boolean, company: Company }> {
        let data = await db.collection('User').findOne({role: 'company', _id: id});
        if (data == null) {
            return {exists: false, company: null};
        }
        return {exists: true, company: new Company(data)};
    }
}

