import { DatabaseSync } from "node:sqlite";
import "reflect-metadata";

const dbUrl = process.env.DATABASE_URL || "database.db";

export const databaseConnection = new DatabaseSync(dbUrl);

export function table(name: string) {
    return function (target: Function) {
        target.constructor["tableName"] = name;
    }
}

export function fields(fields: Record<string, any>) {
    return function (target: Function) {
        for (const [key, value] of Object.entries(fields)) {
            if (typeof value !== "function") {
                throw new Error(`Field ${key} is not a valid type`);
            }
            Reflect.defineMetadata("fields", fields, target);
            target.prototype[key] = value();
        }
    }
}