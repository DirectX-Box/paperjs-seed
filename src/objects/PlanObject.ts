import { PlanColor } from "./PlanColor";
import { PlanPoint } from "./PlanPoint";
import { PlanShape } from "./PlanShape";

export class PlanObject {

    // Nom de l'objet
    private name: string;

    // Couleur de l'objet.
    private color: PlanColor;

    // Point d'origine de l'objet
    private origin: PlanPoint;

    // True si la taille peut être modifié
    private canBeExtended: boolean;

    // Figure pour cet objet.
    private shape: PlanShape;

    // Constructeur.
    constructor( name: string, color: PlanColor, origin: PlanPoint, shape: PlanShape, canBeExtended: boolean )
    {
        this.name = name;
        this.color = color;
        this.origin = origin;
        this.canBeExtended = canBeExtended;
        this.shape = shape;
    }

    // Retourne le nom de l'objet.
    public getName() : string
    {
        return this.name;
    }

    // Retourne la couleur de l'objet.
    public getColor() : PlanColor
    {
        return this.color;
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

    // Fixe la couleur de l'objet.
    public setColor( color: PlanColor ) : void
    {
        this.color = color;
    }

    // Fixe la position de l'objet.
    public setOrigin( point: PlanPoint ) : void
    {
        this.origin = point;
    }

}