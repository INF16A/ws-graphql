import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {registerInternshipResolver} from "./RegisterInternship";

export const createRootResolver = (db: Db) => ({
    hello: () => new Greeting(),
    companies: () => companyResolver(db),
    registerCompany: registerCompanyResolver(db),
    registerInternshipOffer: registerInternshipResolver(db)
});
