import {Location} from "./Location";

export class Address {
    private _street: string;
    private _plz: string;
    private _town: string;
    private _location: Location;

    constructor(data) {
        this.street = data.street;
        this.plz = data.plz;
        this.town = data.town;
        this.location = new Location(data.location);
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get plz(): string {
        return this._plz;
    }

    set plz(value: string) {
        this._plz = value;
    }

    get town(): string {
        return this._town;
    }

    set town(value: string) {
        this._town = value;
    }

    get location(): Location {
        return this._location;
    }

    set location(value: Location) {
        this._location = value;
    }

    public serialize(): any {
        return {
            street: this.street,
            plz: this.plz,
            town: this.town,
            location: this._location.serialize()
        };
    }
}