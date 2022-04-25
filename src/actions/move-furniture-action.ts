import { Action } from '../actions';

export class MoveFurnitureAction extends Action {
  protected readonly name = "Déplacement";

  public item: number = 0;
  public targetPosX: number = 0;
  public targetPosY: number = 0;
  public prevPosX: number = 0;
  public prevPosY: number = 0;

  public constructor(
                    referredItem: number,
                    prevPosX: number, prevPosY: number,
                    targetPosX: number, targetPosY: number) {
    super();
    this.item = referredItem;
    this.targetPosX = targetPosX;
    this.targetPosY = targetPosY;
    this.prevPosX = prevPosX;
    this.prevPosY = prevPosY;
  }

  public reverse(): MoveFurnitureAction {
    return new MoveFurnitureAction(
                                  this.item,
                                  this.targetPosX, this.targetPosY,
                                  this.prevPosX, this.prevPosY);
  }

}
