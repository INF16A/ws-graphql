import {GeoJSONPoint} from "../services/Geocoder";

export class Location
{
    private _lat: number;
    private _long: number;
    constructor(point: GeoJSONPoint) {
        this._lat = point.coordinates[0];
        this._long = point.coordinates[1];
    }

    get lat(): number {
        return this._lat;
    }

    set lat(value: number) {
        this._lat = value;
    }

    get long(): number {
        return this._long;
    }

    set long(value: number) {
        this._long = value;
    }

    public serialize(): GeoJSONPoint {
        return {
            type: "Point",
            coordinates: [this.lat, this.long]
        };
    }
}