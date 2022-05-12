import { PlanBuilding } from "../PlanBuilding";
import { PlanObject } from "../PlanObject"

// Interface pour dessiner les figures.
export interface DrawAdapterInterface
{
    // Efface la sélection.
    clearSelection() : void

    // Efface le bâtiment passé en paramètre.
    deleteBuilding() : void;

    // Efface l'objet passé en paramètre.
    deleteObject( object: PlanObject ) : void;

    // Dessine le bâtiment passé en paramètre.
    drawBuilding( building: PlanBuilding ) : void;

    // Dessine l'objet passé en paramètre.
    drawObject( object: PlanObject ) : void;

    // Sélectionne l'objet passé en paramètre.
    selectObject( object: PlanObject ) : void
}