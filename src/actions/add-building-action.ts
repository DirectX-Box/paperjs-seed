import { Action, DeleteFurnitureAction } from '../actions';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

export class AddBuildingAction extends Action {
  protected readonly name = "Construction";

  public item: number = 0;
  public width: number;
  public length: number;
  public border: number;
  public spawnPos: PlanPoint;

  public constructor(
                      width: number, length: number, border: number) {
    super();
    this.width = width;
    this.length = length;
    this.border = border;
  }

  public reverse(): DeleteFurnitureAction {
    return new DeleteFurnitureAction(this.item, this.objectDef, this.spawnPos);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
      console.log(this.objectDef)
    let object: number = oim.createObjectFromDefinition(
      this.objectDef, this.spawnPos);

    if (object!) this.item = object;
  }

}
