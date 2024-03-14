export class AbstractEntity {
  constructor(id?: number) {
    this._id = id;
  }

  protected _id?: number;
  public get id(): number | undefined {
    return this._id;
  }

  public assignId(id: number): void {
    if (this._id) {
      throw new Error("Entity already has an id");
    }

    this._id = id;
  }
}
