import {Db} from "mongodb";
import {Address, Company, Contact} from "./Company";
import {CompanyRepository} from "./CompanyRepository";

export const internshipOfferResolver = async (db: Db, companyRepository: CompanyRepository) => {
    const internshipOffers = await db.collection('Internships').find({}).toArray();
    return internshipOffers.map(internshipOffer => {
        return new InternshipOffer(internshipOffer, companyRepository);
    });
};

export class InternshipOffer {
    constructor(private  data: any, private companyRepository: CompanyRepository) {
    }

    async company(): Promise<Company> {
        return this.companyRepository.getCompanyById(this.data.companyId);
    }

    contact(): Contact {
        return new Contact(this.data.contact);
    }

    jobname(): string {
        return this.data.jobname;
    }

    description(): string {
        return this.data.description;
    }

    location(): Address {
        return new Address(this.data.location);
    }

    link(): string {
        return this.data.link;
    }

    id(): string {
        return this.data._id;
    }


}