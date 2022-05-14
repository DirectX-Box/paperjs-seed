import { Action, DeleteFurnitureAction } from '../actions';
import { Plan } from '../plan/plan';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

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
  // Nombre d'items à ajouter
  public nbItems: number = 1;

  public constructor(
                      index: Array<number>,
                      objectDef: Array<ObjectDefinition>,
                      position: Array<PlanPoint>) {
    super();
    this.item = index;
    this.objectDef = objectDef;
    this.spawnPos = position;
    this.nbItems = Math.min(index.length, objectDef.length, position.length)
  }

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(this.item, this.objectDef, this.spawnPos);
  }

  public execute(): void {

    let oim = ObjectInstancesManager.getInstance();
    console.log(this.objectDef)
    let plan = Plan.getInstance();

    for (let i = 0; i <= this.nbItems; i++) {
      let object: number = oim.createObjectFromDefinition(
        this.objectDef[i], this.spawnPos[i]);

      console.log(object)
      if (object!) {
        this.item[i] = object;
        let lastPath = plan.getLastPath();
        plan.updateObject(lastPath)
      }
    }
  }

}
