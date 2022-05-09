import { PlanObject } from "../PlanObject"

// Interface pour dessiner les figures.
export interface DrawAdapterInterface
{
    // Efface l'objet passé en paramètre.
    deleteObject( object: PlanObject ) : void;

    // Dessine l'objet passé en paramètre.
    drawObject( object: PlanObject ) : void;
}