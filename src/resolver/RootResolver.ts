import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {registerInternshipResolver} from "./RegisterInternship";
import {Mail} from "../Mail";
import {internshipOfferResolver} from "./InternshipOffer";
import {CompanyRepository} from "./CompanyRepository";

export const createRootResolver = (db: Db, mail: Mail, companyRepository: CompanyRepository) => ({
    hello: (args, ctx) => new Greeting(ctx),
    companies: () => companyResolver(db),
    registerCompany: registerCompanyResolver(db, mail),
    registerInternshipOffer: (ctx) => registerInternshipResolver(db, ctx, companyRepository),
    internshipOffers: () => internshipOfferResolver(db, companyRepository),
});
