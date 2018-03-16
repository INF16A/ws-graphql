import {Context} from "../services/Context";

export class Greeting {

    constructor(private context: Context) {
    }

    word() {
        return "Hello";
    }

    recipient() {
        if(this.context.user)
            return this.context.user.username;
        return "World";
    }
}