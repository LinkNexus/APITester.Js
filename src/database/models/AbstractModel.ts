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
                instance[key] = (value as any)(data[key]);
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

    static find(id: number | string | bigint) {
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
        const statement = this.connection.prepare(query).run();
        return this.find(statement.lastInsertRowid);
    }

    static saveOrCreate(data: any) {
        const tableName = this.constructor["tableName"];
        const fields = Object.keys(data).join(", ");
        const values = Object.values(data).map((value) => {
            if (typeof value === "object") {
                return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
            }
            return `'${String(value).replace(/'/g, "''")}'`;
        }).join(", ");
        const query = `INSERT OR REPLACE INTO ${tableName} (${fields}) VALUES (${values})`;
        const statement = this.connection.prepare(query).run();
        return this.find(statement.lastInsertRowid);
    }

    static update(data: any) {
        const tableName = this.constructor["tableName"];
        const fields = Object.keys(data).map((key) => {
            if (typeof data[key] === "object") {
                return `${key} = '${JSON.stringify(data[key]).replace(/'/g, "''")}'`;
            }
            return `${key} = '${String(data[key]).replace(/'/g, "''")}'`;
        }).join(", ");
        const query = `UPDATE ${tableName} SET ${fields} WHERE id = ?`;
        this.connection.prepare(query).run(data.id);
        return this.find(data.id);
    }

    static delete(id: number | string | bigint) {
        const tableName = this.constructor["tableName"];
        const query = `DELETE FROM ${tableName} WHERE id = ?`;
        this.connection.prepare(query).run(id);
    }
}