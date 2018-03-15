import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {Mail} from "../Mail";
import {internshipOfferResolver} from "./InternshipOffer";
import {CompanyRepository} from "./CompanyRepository";
import {registerInternshipResolver} from "./RegisterInternship";

export const createRootResolver = (db: Db, mail: Mail, companyRepository: CompanyRepository) => ({
    hello: (args, ctx) => new Greeting(ctx),
    companies: () => companyResolver(db),
    registerCompany: registerCompanyResolver(db, mail),
    registerInternshipOffer: registerInternshipResolver(db, companyRepository),
    internshipOffers:
        () => internshipOfferResolver(db, companyRepository),
});
