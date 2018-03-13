import {Mail} from "./Mail";
import {Database} from "./Database";
import {Request} from "express";

export interface Context {
    mail: Mail,
    db: Database,
    req: Request,
    user: any
}

export function buildContext(mail: Mail, db: Database, req: Request) {
    return {
        mail,
        db,
        req,
        user: (req as any).user || null
    };
}