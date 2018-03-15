export class Address {
    private _street: string;
    private _plz: string;
    private _town: string;
    private _lat: string;
    private _long: string;

    constructor(data) {
        this.street = data.street;
        this.plz = data.plz;
        this.town = data.town;
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

    get lat(): string {
        return this._lat;
    }

    set lat(value: string) {
        this._lat = value;
    }

    get long(): string {
        return this._long;
    }

    set long(value: string) {
        this._long = value;
    }

    public serialize(): any {
        return {
            street: this.street,
            plz: this.plz,
            town: this.town,
            lat: this.lat,
            long: this.long
        };
    }
}