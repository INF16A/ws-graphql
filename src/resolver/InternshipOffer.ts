import {Db} from "mongodb";
import {Address, Contact} from "./Company";

export const internshipOfferResolver = async (db: Db) => {
    const internshipOffers = await db.collection('Internships').find({}).toArray();
    return internshipOffers.map(internshipOffer => new InternshipOffer(internshipOffer));
};

export class InternshipOffer {
    constructor(private  data: any) {
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


}