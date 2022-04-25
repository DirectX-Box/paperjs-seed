import { Action, AddFurnitureAction } from '../actions';

export class DeleteFurnitureAction extends Action {
  protected readonly name = "Suppression";

    public item: number = 0;
    public spawnPosX: number = 0;
    public spawnPosY: number = 0;

  public constructor(
                      referredItem: number,
                      spawnPosX: number, spawnPosY: number) {
    super();
    this.item = referredItem;
    this.spawnPosX = spawnPosX;
    this.spawnPosY = spawnPosY;
  }

  public reverse(): AddFurnitureAction {
    return new AddFurnitureAction(this.item, this.spawnPosX, this.spawnPosY);
  }

}
