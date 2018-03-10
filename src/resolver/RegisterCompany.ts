import {Db} from "mongodb";
import {hash} from "bcryptjs";
import {Company} from "./Company";

import {UserError} from "graphql-errors";

const doesUserExist = async (db: Db, username: string): Promise<boolean> => {
    let user = await db.collection('User').findOne({username});
    return user !== null;
};

export const registerCompanyResolver = (db: Db) => async ({input}) => {
    if (await doesUserExist(db, input.username)) {
        throw new UserError("A user with this username already exists");
    }

    const pwHash = await hash(input.password, 10);

    const doc = {
        name: input.name,
        role: 'company',
        description: input.description,
        address: {
            street: input.addressStreet,
            plz: input.addressPLZ,
            town: input.addressTown
        },
        contact: {
            name: input.contactName,
            email: input.contactEmail,
            phone: input.contactPhone
        },
        username: input.username,
        password: pwHash,
        verified: false
    };

    let result = await db.collection('User').insertOne(doc);
    let company = await db.collection('User').findOne({_id: result.insertedId});
    return new Company(company);
};
