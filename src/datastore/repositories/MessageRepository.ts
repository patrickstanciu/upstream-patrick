import { AbstractRepository } from "./AbstractRepository";
import { MessageRow } from "../schema/MessageRow";
import { MessageEntity } from "../../model/entities/MessageEntity";
import { Contact } from "../../model/value-objects/Contact";

export class MessageRepository extends AbstractRepository<
  MessageRow,
  MessageEntity
> {
  protected loadEntity(row: MessageRow): MessageEntity {
    return new MessageEntity(
      row.sender_id,
      row.thread_id,
      row.email_id,
      row.body,
      new Date(row.date),
      row.id
    );
  }

  public async persist(messages: MessageEntity[]): Promise<void> {
    const stmt = await this.database.prepare(
      "INSERT INTO messages (sender_id, thread_id, email_id, body, date) VALUES (@sender_id, @thread_id, @email_id, @body, @date)"
    );

    for (const message of messages) {
      const result = await stmt.run({
        "@sender_id": message.senderId,
        "@thread_id": message.threadId,
        "@email_id": message.emailId,
        "@body": message.body,
        "@date": message.date.getTime(),
      });

      message.assignId(result.lastID!);
    }

    await stmt.finalize();
  }

  public async findOneByEmailUniversalMessageIdentifier(
    universalMessageId: Contact
  ): Promise<MessageEntity | null> {
    const row = await this.database.get<MessageRow>(
      "SELECT * FROM messages m JOIN emails e ON m.email_id = e.id WHERE e.universal_message_id = @universal_message_id",
      {
        "@universal_message_id": universalMessageId.toString(),
      }
    );

    if (!row) {
      return null;
    }

    return this.loadEntity(row);
  }

  public async findAll(): Promise<MessageEntity[]> {
    const rows = await this.database.all<MessageRow[]>(
      "SELECT * FROM messages"
    );
    return this.loadEntities(rows);
  }
}
