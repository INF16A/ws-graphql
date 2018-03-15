import {AddressView, CompanyView, ContactView} from "./Company";
import {Internship} from "../Domain/Internship";
import {Context} from "../Context";

export const internshipOfferResolver = async ({}, ctx: Context) => {
    const internshipOffers = await ctx.repositoryFactory.getInternshipRepository().getAll();
    return internshipOffers.map(i => new InternshipOffer(i));
};

export class InternshipOffer {
    constructor(private internship: Internship) {
    }

    async company({}, ctx: Context): Promise<CompanyView> {
        return new CompanyView(await ctx.repositoryFactory.getCompanyRepository().getCompanyById(this.id()));
    }

    contact(): ContactView {
        return new ContactView(this.internship.contact);
    }

    jobname(): string {
        return this.internship.jobname;
    }

    description(): string {
        return this.internship.description;
    }

    location(): AddressView {
        return new AddressView(this.internship.location);
    }

    link(): string {
        return this.internship.link;
    }

    id(): string {
        return this.internship.id;
    }
}