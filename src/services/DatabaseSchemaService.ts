import { Database } from "sqlite";
import { fs } from "../datastore/repositories/AbstractRepository";

export class DatabaseSchemaService {
  constructor(private readonly database: Database) {}

  public async resetDatabaseSchemaAndData() {
    const data = await fs.readFile("schema.sql", "utf8");
    await this.database.exec(data);
  }
}
