import { AbstractRepository } from "./AbstractRepository";
import { ThreadRow } from "../schema/ThreadRow";
import { ThreadEntity } from "../../model/entities/ThreadEntity";

export class ThreadRepository extends AbstractRepository<ThreadRow, ThreadEntity> {
  protected loadEntity(row: ThreadRow): ThreadEntity {
    return new ThreadEntity(row.name, row.id);
  }

  public async persist(threads: ThreadEntity[]): Promise<void> {
    const stmt = await this.database.prepare("INSERT INTO threads (name) VALUES (@name)");

    for (const thread of threads) {
      const result = await stmt.run({
        "@name": thread.name,
      });

      const insertedId = result.lastID;
      thread.assignId(insertedId!);
    }

    await stmt.finalize();
  }

  public async findAll(): Promise<ThreadEntity[]> {
    const rows = await this.database.all<ThreadRow[]>("SELECT * FROM threads");
    return this.loadEntities(rows);
  }

  public async findById(id: number): Promise<ThreadEntity | null> {
    const row = await this.database.get<ThreadRow>("SELECT * FROM threads WHERE id = @id", {
      "@id": id,
    });

    if (!row) {
      return null;
    }

    return this.loadEntity(row);
  }
}
