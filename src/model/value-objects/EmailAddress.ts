export class EmailAddress {
  constructor(public readonly value: string) {
    if (!EmailAddress.isValueValid(value)) {
      throw new Error(`Invalid email address: ${value}`);
    }
  }

  public equals(other: EmailAddress): boolean {
    return this.value === other.value;
  }

  private static isValueValid(value: string): boolean {
    return value.match(/^[^@]+@[^@]+$/) !== null;
  }

  public toString(): string {
    return this.value;
  }
}
