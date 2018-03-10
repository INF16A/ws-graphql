import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {registerInternshipResolver} from "./RegisterInternship";
import {internshipOfferResolver} from "./InternshipOffer";

export const createRootResolver = (db: Db) => ({
        hello: () => new Greeting(),
        companies: () => companyResolver(db),
        internshipOffers: () => internshipOfferResolver(db),
        registerCompany: registerCompanyResolver(db),
        registerInternshipOffer:
            registerInternshipResolver(db)
    })
;
