import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import {Application} from "express";
import {QueryResolver} from "./resolver/Query";
import {buildSchema} from "graphql";
import {schemas} from "./schema";

const app: Application = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(schemas),
    rootValue: QueryResolver,
    graphiql: true
}));

app.listen(3000);