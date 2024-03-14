import { EmailAddress } from "./EmailAddress";

export class Contact {
  constructor(
    public readonly name: string | null,
    public readonly email: EmailAddress
  ) {}

  public static parse(value: string): Contact {
    const matches = value.match(/^([^<]*)\s*<([^>]*)>$/);
    if (matches) {
      const name = matches[1].trim();
      return new Contact(name || null, new EmailAddress(matches[2]));
    } else {
      return new Contact(null, new EmailAddress(value));
    }
  }

  public toString(): string {
    if (this.name) {
      return `${this.name} <${this.email}>`;
    } else {
      return this.email.toString();
    }
  }
}
