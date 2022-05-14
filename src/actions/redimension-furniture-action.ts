import { Action } from '../actions';
import * as paper from "paper";
import { Plan } from '../plan';

export class RedimensionFurnitureAction extends Action {
  protected readonly name = "Redimensionnement";

  public path: paper.Path;
  public rect: paper.Rectangle;
  public prev_rect: paper.Rectangle;
  /*public item: number = 0;
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
    path: paper.Path,
    rect: paper.Rectangle,
    prev_rect: paper.Rectangle) {
                    /*referredItem: number, edges: number[],
                    prevPosX1: number[], prevPosY1: number[],
                    targetPosX1: number[], targetPosY1: number[],
                    prevPosX2: number[], prevPosY2: number[],
                    targetPosX2: number[], targetPosY2: number[]) {*/
    super();
    this.path = path;
    this.rect = rect;
    this.prev_rect = prev_rect;
    /*this.item = referredItem;
    this.edges = edges;
    this.prevPosX1 = prevPosX1;
    this.prevPosY1 = prevPosY1;
    this.targetPosX1 = targetPosX1;
    this.targetPosY1 = targetPosY1;
    this.prevPosX2 = prevPosX2;
    this.prevPosY2 = prevPosY2;
    this.targetPosX2 = targetPosX2;
    this.targetPosY2 = targetPosY2;*/
  }

  public reverse() {
    return new RedimensionFurnitureAction(
      this.path,
      this.prev_rect,
      this.rect,
    )
                                  /*this.item, this.edges,
                                  this.targetPosX1, this.targetPosY1,
                                  this.prevPosX1, this.prevPosY1,
                                  this.targetPosX2, this.targetPosY2,
                                  this.prevPosX2, this.prevPosY2)*/
  }

  public execute(): void {
    let plan = Plan.getInstance();
    this.path.bounds = this.rect;
    plan.updateObject(this.path);
  }

}
