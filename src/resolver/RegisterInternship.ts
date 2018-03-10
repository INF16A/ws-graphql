import {Db} from "mongodb";
import {InternshipOffer} from "../schema/InternshipOffer";

export const internshipResolver = async (db: Db) => {
    const internshipOffers = await db.collection('Internships').find({}).toArray();
    return internshipOffers.map(internshipOffer => new InternshipOffer(internshipOffer));
};

export const registerInternshipResolver = (db: Db) => async ({input}) => {
    const doc = {
        description: input.description,
        jobname: input.jobname,
        location: {
            street: input.addressStreet,
            plz: input.addressPLZ,
            town: input.addressTown
        },
        contact: {
            name: input.contactName,
            email: input.contactEmail,
            phone: input.contactPhone
        },
        link: input.link
    };
    let result = await db.collection('Internships').insertOne(doc);
    let internshipOffer = await db.collection('Internships').findOne({_id: result.insertedId});
    return new InternshipOffer(internshipOffer);
};