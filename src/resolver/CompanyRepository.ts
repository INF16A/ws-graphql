import {Db} from "mongodb";
import {Company} from "./Company";

class CompanyRepository {
    public async getCompanyById(db: Db, id: string): Promise<Company> {
        return new Company(await db.collection('User').find({role: 'company', _id: id}).limit(1));

    }
}

export const companyRepository = new CompanyRepository();