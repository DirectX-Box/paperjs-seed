import { Action, DeleteFurnitureAction } from '../actions';
import { Plan } from '../plan/plan';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';
import * as paper from "paper";

// Action représentant l'ajout d'un meuble sur le Plan
export class AddFurnitureAction extends Action {
  protected readonly name = "Pose";

  // ID de l'objet
  //    Utilisé pour générer l'action inverse
  public item: Array<number> = [0];
  // Définition de l'objet pour ajout
  public objectDef: Array<ObjectDefinition>;
  // Origine du point dans le Plan
  public spawnPos: Array<PlanPoint>;
  // Origine du point dans le Plan
  public boundRects: Array<paper.Rectangle>;
  // Nombre d'items à ajouter
  public nbItems: number = 1;

  public constructor(
                      index: Array<number>,
                      objectDef: Array<ObjectDefinition>,
                      position: Array<PlanPoint>,
                      boundRects: Array<paper.Rectangle>) {
    super();
    this.item = index;
    this.objectDef = objectDef;
    this.spawnPos = position;
    this.boundRects = boundRects;
    this.nbItems = Math.min(
      index.length, objectDef.length, position.length, boundRects.length)
  }

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(
      this.item, this.objectDef, this.spawnPos, this.boundRects);
  }

  public execute(): void {

    let oim = ObjectInstancesManager.getInstance();
    console.log(this.objectDef)
    let plan = Plan.getInstance();

    for (let i = 0; i < this.nbItems; i++) {
      let object: number = plan.createObject(
        this.objectDef[i],
        new paper.Point(this.spawnPos[i].getX(), this.spawnPos[i].getY())
      );

      console.log(object)
      if (object!) {
        this.item[i] = object;
        let lastPath = plan.getLastPath();
        lastPath.bounds = this.boundRects[i];
        //plan.updateObject(lastPath)
      }
    }
  }

}
