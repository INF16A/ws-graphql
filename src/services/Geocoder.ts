import {createClient} from "@google/maps";
import * as util from "util";

export type GeoJSONPoint = {
    type: "Point",
    coordinates: [number, number]
};

export class Geocoder
{
    private mapsClient;
    private geocodePromise;

    public constructor() {
        this.mapsClient = createClient({key: process.env.GOOGLE_KEY});
        this.geocodePromise = util.promisify(this.mapsClient.geocode);
    }

    public async geocode(address: string): Promise<GeoJSONPoint> {
        let results = (await this.geocodePromise({address})).json.results;
        if(results.length > 0) {
            return {
                type: "Point",
                coordinates: [results[0].geometry.location.lat, results[0].geometry.location.lng]
            }
        }
        throw new Error(`Could not geocode address: ${address}`);
    }

}