import {Greeting} from "./Greeting";

export const QueryResolver = {
    hello: () => new Greeting()
};
