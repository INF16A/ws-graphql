import {Greeting} from "./Greeting";
import {companyResolver} from "./Company";
import {Db} from "mongodb";

export const createRootResolver = (db: Db) => ({
    hello: () => new Greeting(),
    companies: () => companyResolver(db)
});
