import {Context} from "../services/Context";
import {UserError} from "graphql-errors";

export const deleteInternship = async ({input}, ctx: Context) => {
    if (ctx.user == null) {
        throw  new UserError("Can't delete an internship unauthorized");
    }

    if (ctx.user.role !== 'company') {
        throw new UserError("Can't delete an internship for a non-existing company");
    }

    const internshipRepository = ctx.repositoryFactory.getInternshipRepository();
    const internship = await internshipRepository.getById(input);
    if (internship === null) {
        throw new UserError("Can't delete a not existing internship");
    }
    if (ctx.user.sub !== internship.company) {
        throw new UserError("Can't delete an internship of a different company.");
    }

    return await internshipRepository.remove(internship);

};