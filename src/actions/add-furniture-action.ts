import { Action, DeleteFurnitureAction } from '../actions';
import { Plan } from '../plan/plan';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

export class AddFurnitureAction extends Action {
  protected readonly name = "Pose";

  public item: number = 0;
  public objectDef: ObjectDefinition;
  public spawnPos: PlanPoint;

  public constructor(
                      index: number,
                      objectDef: ObjectDefinition,
                      position: PlanPoint) {
    super();
    this.item = index;
    this.objectDef = objectDef;
    this.spawnPos = position;
  }

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(this.item, this.objectDef, this.spawnPos);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    console.log(this.objectDef)
    let object: number = oim.createObjectFromDefinition(
      this.objectDef, this.spawnPos);
    console.log(object)
    if (object!) {
      this.item = object;
      let plan = Plan.getInstance();
      let lastPath = plan.getLastPath();
      plan.updateObject(lastPath)
    }
  }

}
