import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {registerInternshipResolver} from "./RegisterInternship";
import {Mail} from "../Mail";
import {internshipOfferResolver} from "./InternshipOffer";

export const createRootResolver = (db: Db, mail: Mail) => ({
    hello: (args, ctx) => new Greeting(ctx),
    companies: () => companyResolver(db),
    registerCompany: registerCompanyResolver(db, mail),
    registerInternshipOffer: registerInternshipResolver(db),
        internshipOffers: () => internshipOfferResolver(db),
    })
;
