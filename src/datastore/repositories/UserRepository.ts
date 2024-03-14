import { AbstractRepository } from "./AbstractRepository";
import { UserRow } from "../schema/UserRow";
import { UserEntity } from "../../model/entities/UserEntity";
import { EmailAddress } from "../../model/value-objects/EmailAddress";

export class UserRepository extends AbstractRepository<UserRow, UserEntity> {
  protected loadEntity(row: UserRow): UserEntity {
    return new UserEntity(row.display_name, new EmailAddress(row.email), row.id);
  }

  public async persist(users: UserEntity[]): Promise<void> {
    const stmt = await this.database.prepare("INSERT INTO users (display_name, email) VALUES (@display_name, @email)");

    for (const user of users) {
      const result = await stmt.run({
        "@display_name": user.displayName,
        "@email": user.email,
      });

      user.assignId(result.lastID!);
    }

    await stmt.finalize();
  }

  public async findAll(): Promise<UserEntity[]> {
    const rows = await this.database.all<UserRow[]>("SELECT * FROM users");
    return this.loadEntities(rows);
  }

  public async findByEmail(email: EmailAddress): Promise<UserEntity | null> {
    const row = await this.database.get<UserRow>("SELECT * FROM users WHERE email = @email", {
      "@email": email.toString(),
    });
    if (row) {
      return this.loadEntity(row);
    } else {
      return null;
    }
  }
}
