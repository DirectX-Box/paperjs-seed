
// Abstraction des actions de l'historique Défaire/Refaire
export abstract class Action {
  protected abstract readonly name: string;

  public abstract reverse(): Action;

  public abstract execute(): void;

  public getName(): string {
    return this.name || "";
  }
}
