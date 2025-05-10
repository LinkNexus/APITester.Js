import { DatabaseSync } from "node:sqlite";
import "reflect-metadata";
import { capitalizeFirstLetter } from "../../assets/helpers/string-manipulation.js";

const dbUrl = process.env.DATABASE_URL || "database.db";

export const databaseConnection = new DatabaseSync(dbUrl);

export function table(name: string) {
    return function (target: Function) {
        Reflect.defineMetadata("tableName", name, target);
    }
}

export function fields(fields: Record<string, Function | { type?: any, collectionEntity?: any, foreignKey?: string }>) {
    return function (target: Function) {
        Reflect.defineMetadata("fields", fields, target);
        for (const [key, value] of Object.entries(fields)) {
            if (typeof value === "function") {
                target.prototype[key] = value();
            } else {
                if (value.collectionEntity) {
                    target.prototype[`get${capitalizeFirstLetter(key)}`] = function () {
                        return [];
                    }
                } else if (value.type) {
                    target.prototype[`get${capitalizeFirstLetter(key)}`] = () => new (value.type())();
                }
            }
        }
    }
}