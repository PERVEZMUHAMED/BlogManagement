import mongoose, { Connection, connect } from "mongoose";


export default class Database {
    private connection: Connection;
    constructor() {
        this.Connect();
    }
    private Connect(): void {
        const { MONGODB_URL } = process.env;
        connect(MONGODB_URL)
            .then(() => {
                console.log(`Database Connected`);
            })
            .catch(() => {
                console.log(`Database not Connected`);
            })
    }
    public getConnection(): Connection {
        return this.connection;
    }
}