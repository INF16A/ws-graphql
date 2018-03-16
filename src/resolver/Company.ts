import {Company} from "../Domain/Company";
import {Address} from "../Domain/Address";
import {Contact} from "../Domain/Contact";
import {Context} from "../services/Context";
import {Location} from "../Domain/Location";

export const companyResolver = async ({}, context: Context) => {
    const companies = await context.repositoryFactory.getCompanyRepository().getAllCompanies();
    return companies.map(c => new CompanyView(c));
};

export class CompanyView {
    constructor(private company: Company) {}

    contact(): ContactView {
        return new ContactView(this.company.contact);
    }

    address(): AddressView {
        return new AddressView(this.company.address);
    }

    name(): string {
        return this.company.name;
    }

    id(): string {
        return this.company.id;
    }

    description() {
        return this.company.description;
    }
}

export class ContactView {
    constructor(private contact: Contact) {}

    name() {
        return this.contact.name;
    }

    email() {
        return this.contact.email;
    }

    phone() {
        return this.contact.phone;
    }
}

export class AddressView {
    constructor(private address: Address) {}

    street() {
        return this.address.street;
    }

    plz() {
        return this.address.plz;
    }

    town() {
        return this.address.town;
    }

    location() {
        return new LocationView(this.address.location);
    }
}

export class LocationView {
    constructor(private location: Location) {}

    lat() {
        return this.location.lat;
    }

    long() {
        return this.location.long;
    }
}