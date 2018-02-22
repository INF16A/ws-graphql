import {Db, MongoClient} from "mongodb";

export class Database {
    private url: string;
    private client: MongoClient;
    private db: Db;

    constructor() {
        const {DB_HOST, DB_NAME} = process.env;
        this.url = `mongodb://${DB_HOST}:27017/${DB_NAME}`;
    }

    public async connect() {
        this.client = await MongoClient.connect(this.url);

        this.db = this.client.db(process.env.DB_NAME);
    }

    public getDatabase(): Db {
        return this.db;
    }
}