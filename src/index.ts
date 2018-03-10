import {config} from "dotenv";
import "source-map-support/register";

import * as express from "express";
import {Application} from "express";
import * as graphqlHTTP from "express-graphql";
import {createRootResolver} from "./resolver/RootResolver";
import {buildSchema} from "graphql";
import {schemas} from "./schema";
import {Database} from "./Database";
import {authenticate} from "./authentication/authentication";
import {authenticationRouter} from "./authentication/endpoint";
import {maskErrors} from "graphql-errors";

config();

import bodyParser = require("body-parser");


const app: Application = express();
const db: Database = new Database();

(async () => {
    await db.connect();

    app.locals.db = db;
    app.use(bodyParser.json());
    app.use(authenticate);
    app.use(authenticationRouter);

    maskErrors(schemas);
    app.use('/graphql', graphqlHTTP({
        schema: buildSchema(schemas),
        rootValue: createRootResolver(db.getDatabase()),
        graphiql: true
    }));

    app.listen(3000, () => console.log('Express listening'));

})().catch(err => {
    console.error(err);
});

