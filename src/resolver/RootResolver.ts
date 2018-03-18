import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {registerCompanyResolver} from "./RegisterCompany";
import {internshipOfferResolver} from "./InternshipOffer";
import {registerInternshipResolver} from "./RegisterInternship";
import {deleteInternship} from "./DeleteInternshipOffer";

export const rootResolver = {
    hello: (args, ctx) => new Greeting(ctx),
    companies: companyResolver,
    registerCompany: registerCompanyResolver,
    registerInternshipOffer: registerInternshipResolver,
    internshipOffers: internshipOfferResolver,
    deleteInternshipOffer:deleteInternship
};
