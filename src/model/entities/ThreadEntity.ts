import { AbstractEntity } from "./AbstractEntity";

export class ThreadEntity extends AbstractEntity {
  constructor(
    public readonly name: string,
    id?: number
  ) {
    super(id);
  }
}
