import { EmailRow } from "../schema/EmailRow";
import { EmailEntity } from "../../model/entities/EmailEntity";
import { ContactList } from "../../model/value-objects/ContactList";
import { Contact } from "../../model/value-objects/Contact";
import { AbstractRepository } from "./AbstractRepository";

export class EmailRepository extends AbstractRepository<EmailRow, EmailEntity> {
  protected loadEntity(row: EmailRow): EmailEntity {
    return new EmailEntity(
      Contact.parse(row.universal_message_id),
      row.in_reply_to ? Contact.parse(row.in_reply_to) : null,
      row.mailserver_id,
      Contact.parse(row.from),
      ContactList.parse(row.to),
      ContactList.parse(row.cc),
      row.body,
      row.subject,
      new Date(row.date),
      row.id
    );
  }
  public async persist(emails: EmailEntity[]): Promise<void> {
    const stmt = await this.database.prepare(
      'INSERT INTO emails (universal_message_id, in_reply_to, mailserver_id, "from", "to", cc, body, subject, date) VALUES (@universal_message_id, @reply_to, @mailserver_id, @from, @to, @cc, @body, @subject, @date)'
    );

    for (const email of emails) {
      const result = await stmt.run({
        "@universal_message_id": email.universalMessageId.toString(),
        "@reply_to": email.inReplyTo ? email.inReplyTo.toString() : null,
        "@mailserver_id": email.mailserverId,
        "@from": email.from.toString(),
        "@to": email.to.toString(),
        "@cc": email.cc ? email.cc.toString() : null,
        "@body": email.body,
        "@subject": email.subject,
        "@date": email.date.getTime(),
      });

      email.assignId(result.lastID!);
    }

    await stmt.finalize();
  }

  public async findAll(): Promise<EmailEntity[]> {
    const rows = await this.database.all<EmailRow[]>("SELECT * FROM emails");
    return this.loadEntities(rows);
  }
}
