import type { DatabaseSync } from "node:sqlite";
import { databaseConnection } from "../connection.js";
import "reflect-metadata";

export abstract class AbstractModel {
    protected static connection: DatabaseSync = databaseConnection;

    static hydrate(data: any) {
        const props = Reflect.getMetadata("fields", this);
        // @ts-ignore
        const instance = new this();

        for (const [key, value] of Object.entries(props)) {
            if (typeof (value as any)() === "object") {
                instance[key] = JSON.parse(data[key]);
            } else {
                instance[key] = data[key];
            }
        }

        return instance;
    }

    static findAll() {
        const tableName = this.constructor["tableName"];
        const query = `SELECT * FROM ${tableName}`;
        const entries = this.connection.prepare(query).all();
        return entries.map((entry: any) => {
            return this.hydrate(entry);
        });
    }

    static find(id: number | string) {
        const tableName = this.constructor["tableName"];
        const query = `SELECT * FROM ${tableName} WHERE id = ?`;
        const entry = this.connection.prepare(query).get(id);
        if (!entry) return null;
        return this.hydrate(entry);
    }

    static save<T>(data: T) {
        const tableName = this.constructor["tableName"];
        const fields = Object.keys(data).join(", ");
        const values = Object.values(data).map((value) => {
            if (typeof value === "object") {
                return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
            }
            return `'${String(value).replace(/'/g, "''")}'`;
        }).join(", ");
        const query = `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
        this.connection.prepare(query).run();
    }
}