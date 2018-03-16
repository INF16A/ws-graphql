import {Mail} from "./Mail";
import {Database} from "./Database";
import {Request} from "express";
import {RepositoryFactory} from "../Domain/repositories/RepositoryFactory";
import {Geocoder} from "./Geocoder";

export interface Context {
    mail: Mail,
    db: Database,
    req: Request,
    user: any,
    repositoryFactory: RepositoryFactory,
    geocoder: Geocoder
}

export function buildContext(mail: Mail, db: Database, req: Request, repositoryFactory: RepositoryFactory, geocoder: Geocoder) {
    return {
        mail,
        db,
        req,
        user: (req as any).user || null,
        repositoryFactory,
        geocoder
    };
}