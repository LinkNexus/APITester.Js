import { AbstractMigration } from "./AbstractMigration.js";

export default class extends AbstractMigration {
    timestamp: number = 1746367999645;
    name: string = "destroy-db";

    up(): void {
        this.connection.exec(`-- TODO: Add migration code here`);
    }
}
