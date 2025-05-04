import { listModules } from "#helpers/modules";
import { databaseConnection } from "../connection.js";
import fs from "node:fs";

const [node, _, flag, migrationId] = process.argv;
const action = flag?.replace(/^-+/, "");

const databasePath = process.env.DATABASE_URL || "./database.db";

if (action === "create") {
    createMigration();
} else {
    fs.open(databasePath, 'wx', (err, fd) => {
        if (err) return;
        fs.close(fd, (err) => {
            if (err) throw err;
        });
    });

    runMigration(migrationId);
}

function createMigration() {
    const timestamp = Date.now();
    const migrationName = process.argv[3];

    const migrationFileName = `${timestamp}-${migrationName || `migration-${timestamp}`}.ts`;
    const migrationFilePath = `./src/database/migrations/${migrationFileName}`;
    const migrationFileContent = `import { AbstractMigration } from "./AbstractMigration.js";

export default class extends AbstractMigration {
    timestamp: number = ${timestamp};
    ${migrationName && `name: string = "${migrationName}";`}

    up(): void {
        this.connection.exec(\`-- TODO: Add migration code here\`);
    }
}
`;

    fs.writeFile(migrationFilePath, migrationFileContent, (err: any) => {
        if (err) {
            console.error("Error creating migration file:", err);
        } else {
            console.log(`Migration file created: ${migrationFilePath}`);
        }
    });
}

function runMigration(migrationId: string | undefined) {
    databaseConnection.exec("CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, timestamp BIGINT NOT NULL);");

    listModules("./src/database/migrations", { exclude: ["AbstractMigration.ts", "migrations.ts"] })
        .then((modules) => {
            const migrations = databaseConnection.prepare("SELECT * FROM migrations").all();

            modules.forEach(({ default: Migration }) => {
                const migration = new Migration(databaseConnection);

                if (migrationId && migration.name !== migrationId) return;

                if (migrations.some((m) => m.name === migration.name)) return;

                databaseConnection.exec("BEGIN TRANSACTION;");
                migration.up();
                databaseConnection.exec("COMMIT;");

                databaseConnection.prepare("INSERT INTO migrations (name, timestamp) VALUES (?, ?)")
                    .run(migration.name, migration.timestamp);

                console.log("Migration executed successfully");
            });
        })
        .catch((error) => {
            console.error("Error executing migrations:", error);
            databaseConnection.exec("ROLLBACK;");
        })
        .finally(() => {
            databaseConnection.close();
        });
}