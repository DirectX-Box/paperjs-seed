import { Action, AddFurnitureAction } from '../actions';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

export class DeleteFurnitureAction extends Action {
  protected readonly name = "Suppression";

    public item: number = 0;
    public objectDef: ObjectDefinition;
    public position: PlanPoint;

  public constructor(
                      referredItem: number,
                      objectDef: ObjectDefinition,
                      position: PlanPoint) {
    super();
    this.item = referredItem;
    this.objectDef = objectDef;
    this.position = position;
  }

  public reverse(): AddFurnitureAction {
    return new AddFurnitureAction(this.objectDef, this.position);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    let object: number = oim.removeObject(this.item);
  }
}
