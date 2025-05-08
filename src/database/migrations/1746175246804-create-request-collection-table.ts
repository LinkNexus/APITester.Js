import {AbstractMigration} from "./AbstractMigration.js";

export default class extends AbstractMigration {
    timestamp: number = 1746175246804;
    name: string = "create-request-table";

    up(): void {
        this.connection.exec(`CREATE TABLE IF NOT EXISTS requests
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            requestType VARCHAR (13) NOT NULL,
            method VARCHAR (5),
            url TEXT NOT NULL,
            headers TEXT,
            body TEXT,
            response TEXT,
            bodyType VARCHAR(30) NOT NULL,
            createdAt DATE NOT NULL DEFAULT (datetime('now','localtime')),
            collectionId INTEGER,
            FOREIGN KEY (collectionId) REFERENCES collection(id)
        );`)
    }
}
