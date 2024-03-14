import { Database, open } from "sqlite";
export const fs = require("fs").promises;

export abstract class AbstractRepository<TRow, TEntity> {
  constructor(protected readonly database: Database) {}

  protected abstract loadEntity(row: TRow): TEntity;
  protected abstract persist(entities: TEntity[]): Promise<void>;
  protected abstract findAll(): Promise<TEntity[]>;

  protected loadEntities(rows: TRow[]): TEntity[] {
    return rows.map((row) => this.loadEntity(row));
  }
}
