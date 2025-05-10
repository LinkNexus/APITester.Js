import type { DatabaseSync } from "node:sqlite";
import { databaseConnection } from "../connection.js";
import "reflect-metadata";
import { capitalizeFirstLetter } from "../../../assets/helpers/string-manipulation.js";

export abstract class AbstractModel {
    protected static connection: DatabaseSync = databaseConnection;

    protected static getTableName() {
        return Reflect.getMetadata("tableName", this);
    }

    protected static getProps(): Record<string, { type: any; collectionEntity?: any; foreignKey?: string } | Function> {
        return Reflect.getMetadata("fields", this);
    }

    protected static getFieldsFromData(data: any) {
        const fields = Object.keys(data).join(", ");
        const values = Object.values(data).map((value) => {
            if (typeof value === "object") {
                return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
            }
            return `'${String(value).replace(/'/g, "''")}'`;
        }).join(", ");

        return { fields, values };
    }

    static hydrate(data: any) {
        // @ts-ignore
        const instance = new this();
        for (const [key, value] of Object.entries(this.getProps())) {
            if (typeof value === "function") {
                if (typeof (value as any)() === "object" && data[key] && data[key] !== null && data[key] !== "undefined") {
                    instance[key] = JSON.parse(data[key]);
                } else {
                    instance[key] = (value as any)(data[key]);
                }
            } else {
                if (typeof value === "object") {
                    if (value.type && value.type().prototype instanceof AbstractModel) instance[`get${capitalizeFirstLetter(key)}`] = () => value.type().find(data[value.foreignKey]);
                    else if (value.collectionEntity && value.collectionEntity().prototype instanceof AbstractModel) {
                        instance[`get${capitalizeFirstLetter(key)}`] = () => value.collectionEntity().findAllBy({ [value.foreignKey]: data.id });
                    }
                }
            }
        }

        return instance;
    }

    static findAll() {
        const query = `SELECT * FROM ${this.getTableName()}`;
        const entries = this.connection.prepare(query).all();
        return entries.map((entry: any) => {
            return this.hydrate(entry);
        });
    }

    static find(id: number | string | bigint) {
        const query = `SELECT *
                       FROM ${this.getTableName()}
                       WHERE id = ?`;
        const entry = this.connection.prepare(query).get(id);
        if (!entry) return null;
        return this.hydrate(entry);
    }

    static save<T>(data: T) {
        const { fields, values } = this.getFieldsFromData(data);
        const query = `INSERT INTO ${this.getTableName()} (${fields})
                       VALUES (${values})`;
        const statement = this.connection.prepare(query).run();
        return this.find(statement.lastInsertRowid);
    }

    static saveOrCreate(data: any) {
        const { fields, values } = this.getFieldsFromData(data);
        const query = `INSERT OR REPLACE INTO ${this.getTableName()} (${fields}) VALUES (${values})`;
        const statement = this.connection.prepare(query).run();
        return this.find(statement.lastInsertRowid);
    }

    static delete(id: number | string | bigint) {
        const query = `DELETE FROM ${this.getTableName()} WHERE id = ?`;
        const props = this.getProps();
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "object" && value.foreignKey) {
                if (value.collectionEntity && value.collectionEntity().prototype instanceof AbstractModel) {
                    const relatedEntities = value.collectionEntity().findAllBy({ [value.foreignKey]: id });
                    for (const entity of relatedEntities) {
                        value.collectionEntity().delete(entity.id);
                    }
                }
            }
        }
        this.connection.prepare(query).run(id);
    }

    static findAllBy(criterias: Record<string, any>) {
        const query = `SELECT * FROM ${this.getTableName()} WHERE ${Object.keys(criterias)
            .map((key) => `${key} = ?`)
            .join(" AND ")}`;
        const statement = this.connection.prepare(query);
        const entries = statement.all(...Object.values(criterias));
        return entries.map((entry: any) => {
            return this.hydrate(entry);
        });
    }
}