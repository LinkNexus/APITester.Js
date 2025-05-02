import type { DatabaseSync } from "node:sqlite";

export abstract class AbstractMigration {
    constructor(protected connection: DatabaseSync) { }
    abstract up(): void;
    abstract timestamp: number;
}