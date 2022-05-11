

export abstract class Action {
  protected abstract readonly name: string;

  public abstract reverse(): Action;

  public abstract execute(): void;

  public getName(): string {
    return this.name || "";
  }
}
