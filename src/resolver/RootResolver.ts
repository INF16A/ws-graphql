import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";
import {registerCompanyResolver} from "./RegisterCompany";
import {registerInternshipResolver} from "./RegisterInternship";
import {Mail} from "../Mail";

export const createRootResolver = (db: Db, mail: Mail) => ({
    hello: () => new Greeting(),
    companies: () => companyResolver(db),
    registerInternshipOffer: registerInternshipResolver(db),
    registerCompany: registerCompanyResolver(db, mail)
});
