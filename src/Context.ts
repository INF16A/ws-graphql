import {Mail} from "./Mail";
import {Database} from "./Database";
import {Request} from "express";
import {RepositoryFactory} from "./Domain/repositories/RepositoryFactory";

export interface Context {
    mail: Mail,
    db: Database,
    req: Request,
    user: any,
    repositoryFactory: RepositoryFactory
}

export function buildContext(mail: Mail, db: Database, req: Request, repositoryFactory: RepositoryFactory) {
    return {
        mail,
        db,
        req,
        user: (req as any).user || null,
        repositoryFactory
    };
}