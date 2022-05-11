import { Action, DeleteFurnitureAction } from '../actions';

export class AddFurnitureAction extends Action {
  protected readonly name = "Pose";

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

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(this.item, this.spawnPosX, this.spawnPosY);
  }

}
