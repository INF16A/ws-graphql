import {Db} from "mongodb";
import {Address, Contact} from "../resolver/Company";

export const InternshipOfferResolver = async (db: Db) => {
    const offers = await db.collection('InternshipOffers').find();
    return offers.map(offer => new InternshipOffer(offer));
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