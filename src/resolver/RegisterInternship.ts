import {Db} from "mongodb";
import {InternshipOffer} from "./InternshipOffer";
import {CompanyRepository} from "./CompanyRepository";
import {UserError} from "graphql-errors";
import {Context} from "../Context";

export const registerInternshipResolver = (db: Db, repo: CompanyRepository) => async ({input}, ctx) => {
        console.log("ctx" + JSON.stringify(ctx.user) + " input:" + JSON.stringify(input));
        if (ctx == null || ctx.user == null || !ctx.user.username) {
            throw  new UserError("Can't register an internship unauthorized");
        }
        const company = await repo.getCompanyByUsername(ctx.user.username);
        if (company === null) {
            throw new UserError("Can't register an internship for a non-existing company");
        }
        console.log("res" + company);

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
            companyId: company.id()
        };

        const insertionResult = await
            db.collection('Internships').insertOne(doc);
        const internshipOffer = await
            db.collection('Internships').findOne({_id: insertionResult.insertedId});
        internshipOffer.companyId = company;
        return new InternshipOffer(internshipOffer, repo);
    }
;

