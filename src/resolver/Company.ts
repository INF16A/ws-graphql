import {Db} from "mongodb";

export const companyResolver = async (db: Db) => {
    const companies = await db.collection('User').find({role: 'company'}).toArray();
    return companies.map(c => new Company(c));
};

export class Company {
    constructor(private data: any) {}

    contact(): Contact {
        return new Contact(this.data.contact);
    }

    address(): Address {
        return new Address(this.data.address);
    }

    name(): string {
        return this.data.name;
    }

    id(): string {
        return this.data._id;
    }

    description() {
        return this.data.description;
    }
}

export class Contact {
    constructor(private data: any) {}

    name() {
        return this.data.name;
    }

    email() {
        return this.data.email;
    }

    phone() {
        return this.data.phone;
    }
}

export class Address {
    constructor(private data: any) {}

    street() {
        return this.data.street;
    }

    plz() {
        return this.data.plz;
    }

    town() {
        return this.data.town;
    }
}