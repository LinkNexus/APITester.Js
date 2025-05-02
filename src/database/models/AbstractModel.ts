import type { DatabaseSync } from "node:sqlite";
import { databaseConnection } from "../connection.js";
import "reflect-metadata";

export abstract class AbstractModel {
    protected static connection: DatabaseSync = databaseConnection;

    static getAll() {
        console.log(this.constructor["tableName"]);
    }

    static save<T>(data: T) {
        const tableName = this.constructor["tableName"];
        const fields = Object.keys(data).join(", ");
        const values = Object.values(data).map((value) => {
            if (typeof value === "object") {
                return `'${JSON.stringify(value)}'`;
            }
            return `'${value}'`
        }).join(", ");
        const query = `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
        this.connection.prepare(query).run();
    }
}