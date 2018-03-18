import {Context} from "../services/Context";
import {UserError} from "graphql-errors";

type DeleteInternshipOffer = {
    id: string;
}
export const deleteInternship = async (input: DeleteInternshipOffer, ctx: Context) => {
    if (ctx.user == null) {
        throw  new UserError("Can't register an internship unauthorized");
    }

    if (ctx.user.role !== 'company') {
        throw new UserError("Can't register an internship for a non-existing company");
    }
    const internshipRepository = ctx.repositoryFactory.getInternshipRepository();
    const internship = await internshipRepository.getById(input.id);
    if (internship === null) {
        throw new UserError("Can't delete a not existing internship");
    }

    return {
        ok: await internshipRepository.remove(internship)
    };

};