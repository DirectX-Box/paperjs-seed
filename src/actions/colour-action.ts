import { Action } from '../actions';
import { PlanColor } from '../objects/PlanColor';
import { PlanObject } from '../objects/PlanObject';
import * as paper from 'paper';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

// Action représentant la coloration d'un objet du Plan
export class ColourAction extends Action {
  protected readonly name = "Coloration";

  // Identifiant de l'objet dans le Plan
  public item: number = 0;
  // Couleur appliquée sur l'objet
  public colour?: paper.Color;
  // Couleur précédente de l'objet
  public prev_colour?: paper.Color;

  public constructor(
                      referredItem: number,
                      colour?: paper.Color,
                      prev_colour?: paper.Color) {
    super();
    this.item = referredItem;
    this.colour = colour;/*new PlanColor(
      colour.red, colour.green, colour.blue, PlanColor.DEFAULT_ALPHA
    );*/
    this.prev_colour = prev_colour;/*new PlanColor(
      prev_colour.red, prev_colour.green, prev_colour.blue, PlanColor.DEFAULT_ALPHA
    );*/
  }

  public reverse(): ColourAction {
    return new ColourAction(this.item, this.prev_colour, this.colour);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    let object: paper.Item = paper.project.activeLayer.getItem({
      id: this.item
    });

    if (this.colour!)
      object.fillColor = this.colour;
  }

}
