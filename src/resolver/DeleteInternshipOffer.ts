import {Context} from "../services/Context";
import {UserError} from "graphql-errors";

export const deleteInternship = async ({input}, ctx: Context) => {
    if (ctx.user == null) {
        throw  new UserError("Can't register an internship unauthorized");
    }

    if (ctx.user.role !== 'company') {
        throw new UserError("Can't register an internship for a non-existing company");
    }
    console.log(input);
    const internshipRepository = ctx.repositoryFactory.getInternshipRepository();
    const internship = await internshipRepository.getById(input);
    console.log(internship);
    if (internship === null) {
        throw new UserError("Can't delete a not existing internship");
    }

    return await internshipRepository.remove(internship);

};