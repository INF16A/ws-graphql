import {Database} from "../../Database";
import {CompanyRepository} from "./CompanyRepository";
import {InternshipRepository} from "./InternshipRepository";

export class RepositoryFactory {
    public constructor(private readonly db: Database) {
    }

    public getCompanyRepository(): CompanyRepository {
        return new CompanyRepository(this.db);
    }

    public getInternshipRepository(): InternshipRepository {
        return new InternshipRepository(this.db);
    }
}