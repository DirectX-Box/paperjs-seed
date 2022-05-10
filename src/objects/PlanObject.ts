import { PlanPoint } from "./PlanPoint";
import { PlanShape } from "./PlanShape";

export class PlanObject {

    // Nom de l'objet
    private name: string;

    // Point d'origine de l'objet
    private origin: PlanPoint;

    // True si la taille peut être modifié
    private canBeExtended: boolean;

    // Figure pour cet objet.
    private shape: PlanShape;

    // Constructeur.
    constructor( name: string, origin: PlanPoint, canBeExtended: boolean )
    {
        this.name = name;
        this.origin = origin;
        this.canBeExtended = canBeExtended;
        this.shape = new PlanShape();
    }

    // Retourne le nom de l'objet.
    public getName() : string
    {
        return this.name;
    }

    // Retourne l'origine de cet objet.
    public getOrigin() : PlanPoint
    {
        return this.origin;
    }

    // Retourne la figure de l'objet.
    public getShape() : PlanShape
    {
        return this.shape;
    }

    // Retourne si l'objet peut être étendu.
    public isExtendable(): boolean
    {
        return this.canBeExtended;
    }

}