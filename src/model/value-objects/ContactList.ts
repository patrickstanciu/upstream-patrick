import { Contact } from "./Contact";

export class ContactList {
  constructor(public readonly contacts: Contact[]) {}

  public static parse(value: string): ContactList {
    if (value === "") {
      return new ContactList([]);
    }

    return new ContactList(value.split(",").map((contact) => Contact.parse(contact.trim())));
  }

  public toString(): string {
    return this.contacts.map((contact) => contact.toString()).join(", ");
  }
}
