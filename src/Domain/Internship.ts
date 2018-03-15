import {Address} from "./Address";
import {Contact} from "./Contact";

export class Internship {
    private _id: string;
    private _jobname: string;
    private _description: string;
    private _location: Address;
    private _link: string;
    private _company: string;
    private _contact: Contact;

    public constructor(data) {
        this._id = data._id;
        this._jobname = data.jobname;
        this._description = data.description;
        this._location = new Address(data.location);
        this._link = data.link;
        this._contact = new Contact(data.contact);
    }

    public serialize(): any {
        return {
            id: this._id,
            jobname: this._jobname,
            description: this._description,
            link: this._link,
            location: this._location.serialize(),
            contact: this.contact.serialize()
        };
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get jobname(): string {
        return this._jobname;
    }

    set jobname(value: string) {
        this._jobname = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get location(): Address {
        return this._location;
    }

    set location(value: Address) {
        this._location = value;
    }

    get link(): string {
        return this._link;
    }

    set link(value: string) {
        this._link = value;
    }

    get company(): string {
        return this._company;
    }

    set company(value: string) {
        this._company = value;
    }


    get contact(): Contact {
        return this._contact;
    }

    set contact(value: Contact) {
        this._contact = value;
    }
}