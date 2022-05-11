import { Action } from '../actions';
import { PlanColor } from '../objects/PlanColor';
import { PlanObject } from '../objects/PlanObject';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

export class ColourAction extends Action {
  protected readonly name = "Pose";

  public item: number = 0;
  public colour: PlanColor;
  public prev_colour: PlanColor;

  public constructor(
                      referredItem: number,
                      colour: PlanColor, prev_colour: PlanColor) {
    super();
    this.item = referredItem;
    this.colour = colour;
    this.prev_colour = prev_colour;
  }

  public reverse(): ColourAction {
    return new ColourAction(this.item, this.prev_colour, this.colour);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    let object: PlanObject = oim.getObject(this.item);

    object.setColor(this.colour)
  }

}
