import { Contact } from "../value-objects/Contact";
import { ContactList } from "../value-objects/ContactList";
import { AbstractEntity } from "./AbstractEntity";

export class EmailEntity extends AbstractEntity {
  constructor(
    public readonly universalMessageId: Contact,
    public readonly inReplyTo: Contact | null,
    public readonly mailserverId: string,
    public readonly from: Contact,
    public readonly to: ContactList,
    public readonly cc: ContactList,
    public readonly body: string,
    public readonly subject: string,
    public readonly date: Date,
    id?: number
  ) {
    super(id);
  }
}
