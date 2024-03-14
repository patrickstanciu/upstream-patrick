import { EmailAddress } from "../value-objects/EmailAddress";
import { AbstractEntity } from "./AbstractEntity";

export class UserEntity extends AbstractEntity {
  constructor(
    public readonly displayName: string,
    public readonly email: EmailAddress,
    id?: number
  ) {
    super(id);
  }
}
