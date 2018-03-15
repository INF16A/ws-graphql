import {InternshipOffer} from "./InternshipOffer";
import {UserError} from "graphql-errors";
import {Context} from "../Context";
import {Internship} from "../Domain/Internship";

export const registerInternshipResolver = async ({input}, ctx: Context) => {
        if (ctx.user == null) {
            throw  new UserError("Can't register an internship unauthorized");
        }

        if (ctx.user.role !== 'company') {
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
            companyId: ctx.user.sub
        };
        const internship = await ctx.repositoryFactory
            .getInternshipRepository()
            .create(new Internship(doc));
        return new InternshipOffer(internship);
    }
;

