import {Db} from "mongodb";
import {hash} from "bcryptjs";
import {CompanyView} from "./Company";

import {UserError} from "graphql-errors";
import {Mail} from "../Mail";
import {randomBytes} from "crypto";
import {promisify} from "util";
import {Context} from "../Context";
import {Company} from "../Domain/Company";


const doesUserExist = async (db: Db, username: string): Promise<boolean> => {
    let user = await db.collection('User').findOne({username});
    return user !== null;
};

const validateEmail = (email: string): boolean => {
    return email.match(/\S+@\S+\.\S+/) !== null;
};

const inputToDoc = async (input) => {
    const pwHash = await hash(input.password, 10);
    const mailToken = (await promisify(randomBytes)(32))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return {
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
        validation: {
            verified: false,
            token: mailToken
        }
    };
};

const sendValidationEmail = async (mail: Mail, companyData) => {
    const name = companyData.contact.name;
    const email = companyData.contact.email;

    await mail.sendMail({
        to: `"${name}" <${email}>`,
        subject: 'Praktikumsbörse Validierung',
        text: `Sehr geehrte/r ${companyData.contact.name},
        
vielen Dank für Ihr Interesse an der Praktikumsbörse. Um Ihren Account nun freizuschalten, müssen Sie nur noch dem folgenden Link folgen um Ihren Account zu bestätigen.

${process.env.DEPLOYMENT_URL}/verify/${companyData.validation.token}

Mit freundlichen Grüßen
Das Team der Praktikumsbörse

---

Diese Mail wurde automatisch generiert.`
    });
};

export const registerCompanyResolver = async ({input}, ctx: Context) => {
    const db = ctx.db.getDatabase();

    if(await doesUserExist(db, input.username)) {
        throw new UserError("A user with this username already exists");
    }

    if(!validateEmail(input.contactEmail)) {
        throw new UserError("This email does not seem valid");
    }

    const company = await ctx.repositoryFactory.getCompanyRepository().create(new Company(await inputToDoc(input)));
    await sendValidationEmail(ctx.mail, company);

    return new CompanyView(company);
};
