import { AbstractMigration } from "./AbstractMigration.js";

export default class extends AbstractMigration {
    timestamp: number = 1746487525222;
    name: string = "create-collections-table"

    up(): void {
        this.connection.exec(`
            CREATE TABLE IF NOT EXISTS collections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                created_at DATE DEFAULT (datetime('now', 'localtime')),
                updated_at DATE DEFAULT (datetime('now', 'localtime')),
                UNIQUE(name)
            );
        `);
    }
}
