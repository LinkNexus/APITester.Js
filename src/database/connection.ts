import { DatabaseSync } from "node:sqlite";
import "reflect-metadata";

const dbUrl = process.env.DATABASE_URL || "database.db";

export const databaseConnection = new DatabaseSync(dbUrl);

export function table(name: string) {
    return function (target: Function) {
        Reflect.defineMetadata("tableName", name, target);
    }
}

export function fields(fields: Record<string, Function | { type: any, column: string }>) {
    return function (target: Function) {
        Reflect.defineMetadata("fields", fields, target);
        for (const [key, value] of Object.entries(fields)) {
            if (typeof value === "function") {
                target.prototype[key] = value();
            } else {
                target.prototype[key] = new (value.type)();
            }
        }
    }
}