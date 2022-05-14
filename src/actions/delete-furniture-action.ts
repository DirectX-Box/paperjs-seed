import { Action, AddFurnitureAction } from '../actions';
import { PlanPoint } from '../objects/PlanPoint';
import { PlanObject } from '../objects/PlanObject';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';

// Action représentant la suppression d'un meuble sur le Plan
export class DeleteFurnitureAction extends Action {
  protected readonly name = "Suppression";

  // ID de l'objet
  public item: Array<number> = [0];
  // Définition de l'objet pour ajout
  //    Utilisé pour générer l'action inverse
  public objectDef: Array<ObjectDefinition>;
  // Origine du point dans le Plan
  //    Utilisé pour générer l'action inverse
  public position: Array<PlanPoint>;
  // Nombre d'items à ajouter
  public nbItems: number = 1;

  public constructor(
                      referredItem: Array<number>,
                      objectDef: Array<ObjectDefinition>,
                      position: Array<PlanPoint>) {
    super();
    this.item = referredItem;
    this.objectDef = objectDef;
    this.position = position;
    this.nbItems = Math.min(referredItem.length, objectDef.length, position.length)
  }

  public reverse(): AddFurnitureAction {
    return new AddFurnitureAction(this.item, this.objectDef, this.position);
  }

  public execute(): void {
    let oim = ObjectInstancesManager.getInstance();
    for (let i = 0; i <= this.nbItems; i++) {
      let object: number = oim.removeObject(this.item[i]);
    }
  }
}
