import {AddressView, CompanyView, ContactView} from "./Company";
import {Internship} from "../Domain/Internship";
import {Context} from "../services/Context";
import {Location} from "../Domain/Location";

type InternshipOfferArguments = {
    id?: string;
    near?: {
        lat: number,
        long: number
    };
    distance?: number;
};

export const internshipOfferResolver = async (args: InternshipOfferArguments, ctx: Context) => {
    const repository = ctx.repositoryFactory.getInternshipRepository();
    let internships: Internship[] = [];
    if("id" in args) {
        const internship = await repository.getById(args.id);
        if(internship !== null)
            internships = [internship];
    } else if("near" in args && "distance" in args) {
        internships = await repository.getNear(Location.fromLatLong(args.near.lat, args.near.long), args.distance);
    } else {
        internships = await repository.getAll();
    }

    return internships.map(i => new InternshipOffer(i));
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

    address(): AddressView {
        return new AddressView(this.internship.address);
    }

    link(): string {
        return this.internship.link;
    }

    id(): string {
        return this.internship.id;
    }
}