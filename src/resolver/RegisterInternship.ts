import {Db} from "mongodb";
import {InternshipOffer} from "./InternshipOffer";
import {CompanyRepository} from "./CompanyRepository";
import {UserError} from "graphql-errors";
import {Context} from "../Context";

export const registerInternshipResolver = (db: Db, ctx: Context, repo: CompanyRepository) => async ({input}) => {
        if (ctx.user == null) {
            throw  new UserError("Can't register an internship unauthorized");
        }
        const result = await repo.getCompanyByUsername(ctx.user.username);
        if (!result.exists) {
            throw new UserError("Can't register an internship for a non-existing company");
        }
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
            link: input.link,
            companyId: result.company
        };

        const insertionResult = await
            db.collection('Internships').insertOne(doc);
        const internshipOffer = await
            db.collection('Internships').findOne({_id: insertionResult.insertedId});
        internshipOffer.companyId = result;
        return new InternshipOffer(internshipOffer);
    }
;