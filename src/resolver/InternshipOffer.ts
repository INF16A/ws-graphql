import {Db} from "mongodb";
import {Address, Company, Contact} from "./Company";
import {companyRepository} from "./CompanyRepository";

export const internshipOfferResolver = async (db: Db) => {
    const internshipOffers = await db.collection('Internships').find({}).toArray();
    return internshipOffers.map(internshipOffer => {
        internshipOffer.company = companyRepository.getCompanyById(db, internshipOffer.company);
        new InternshipOffer(internshipOffer)
    });
};

export class InternshipOffer {
    constructor(private  data: any) {
    }

    company(): Company {
        return this.data.company;
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