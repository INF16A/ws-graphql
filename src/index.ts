import {config} from "dotenv";
config();

import "source-map-support/register";

import * as express from "express";
import {Application} from "express";
import * as graphqlHTTP from "express-graphql";
import {createRootResolver} from "./resolver/RootResolver";
import {buildSchema} from "graphql";
import {schemas} from "./schema";
import {Database} from "./Database";
import {authenticate} from "./authentication/authentication";
import bodyParser = require("body-parser");
import {authenticationRouter} from "./authentication/endpoint";
import {maskErrors} from "graphql-errors";
import {Mail} from "./Mail";
import {validationRouter} from "./authentication/emailValidation";
import * as cors from "cors";
import {buildContext} from "./Context";

console.log('[Startup] Starting prakt-backend');

const app: Application = express();
const db: Database = new Database();
const mail: Mail = new Mail();

(async () => {
    console.log('[Startup] Setting up Database and Mail connection');
    await Promise.all([
        db.connect().then(() => console.log('[Startup] Database connected')),
        mail.connect().then(() => console.log('[Startup] Mail connected'))
    ]);
    console.log('[Startup] Connection setup successfully');

    console.log('[Startup] Setting up Web API');
    app.locals.db  = db;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(authenticate);
    app.use(authenticationRouter);
    app.use(validationRouter);

    maskErrors(schemas);
    app.use('/graphql', graphqlHTTP(request => ({
        schema: buildSchema(schemas),
        rootValue: createRootResolver(db.getDatabase(), mail),
        graphiql: true,
        context: buildContext(mail, db, request)
    })));

    app.listen(3000, () => console.log('[Startup] Web API setup complete'));

})().catch(err => {
    console.error(`Error: ${err}`);
});

