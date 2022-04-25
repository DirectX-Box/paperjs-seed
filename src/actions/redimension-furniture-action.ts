import { Action } from '../actions';

export class RedimensionFurnitureAction extends Action {
  protected readonly name = "Redimensionnement";

  public item: number = 0;
  public edges: number[] = [];
  public prevPosX1: number[] = [];
  public prevPosY1: number[] = [];
  public targetPosX1: number[] = [];
  public targetPosY1: number[] = [];
  public prevPosX2: number[] = [];
  public prevPosY2: number[] = [];
  public targetPosX2: number[] = [];
  public targetPosY2: number[] = [];
  /*private interface EdgeScaling {
    int edgeIndex,
    int prevPosX1, int prevPosY1,
    int targetPosX1, int targetPosY1,
    int prevPosX2, int prevPosY2,
    int targetPosX2, int targetPosY2,
  }*/

  public constructor(
                    referredItem: number, edges: number[],
                    prevPosX1: number[], prevPosY1: number[],
                    targetPosX1: number[], targetPosY1: number[],
                    prevPosX2: number[], prevPosY2: number[],
                    targetPosX2: number[], targetPosY2: number[]) {
    super();
    this.item = referredItem;
    this.edges = edges;
    this.prevPosX1 = prevPosX1;
    this.prevPosY1 = prevPosY1;
    this.targetPosX1 = targetPosX1;
    this.targetPosY1 = targetPosY1;
    this.prevPosX2 = prevPosX2;
    this.prevPosY2 = prevPosY2;
    this.targetPosX2 = targetPosX2;
    this.targetPosY2 = targetPosY2;

  }

  public reverse() {
    return new RedimensionFurnitureAction(
                                  this.item, this.edges,
                                  this.targetPosX1, this.targetPosY1,
                                  this.prevPosX1, this.prevPosY1,
                                  this.targetPosX2, this.targetPosY2,
                                  this.prevPosX2, this.prevPosY2)
  }

}
