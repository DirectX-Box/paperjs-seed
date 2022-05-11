import { Action, DeleteFurnitureAction } from '../actions';
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
                      objectDef: ObjectDefinition, position: PlanPoint) {
    super();
    this.item = 0;
    this.objectDef = objectDef;
    this.spawnPos = position;
  }

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(this.item, this.objectDef, this.spawnPos);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    let object: number = oim.createObjectFromDefinition(
      this.objectDef, this.spawnPos);

    if (object!) this.item = object;
  }

}
