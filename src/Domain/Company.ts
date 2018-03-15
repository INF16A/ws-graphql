import {Address} from "./Address";
import {Contact} from "./Contact";
import {User} from "./User";

export class Company extends User {
    private _id: string;
    private _name: string;
    private _description: string;
    private _contact: Contact;
    private _address: Address;

    public constructor(data) {
        super(data);
        this.id = data._id;
        this.name = data.name;
        this.description = data.description;
        this.contact = new Contact(data.contact);
        this.address = new Address(data.address);
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get contact(): Contact {
        return this._contact;
    }

    set contact(value: Contact) {
        this._contact = value;
    }

    get address(): Address {
        return this._address;
    }

    set address(value: Address) {
        this._address = value;
    }

    public serialize(): any {
        return {
            ...super.serialize(),
            name: this.name,
            description: this.description,
            address: this.address.serialize(),
            contact: this.contact.serialize()
        }
    }
}