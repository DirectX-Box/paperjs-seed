import { PlanColor } from "./PlanColor";

// Définition d'un objet.
export class ObjectDefinition
{
    // Nom de l'objet.
    private name: string;

    // Forme de l'objet.
    private shape: string;

    // Couleur de l'objet.
    private color: PlanColor;

    constructor( name: string, shape: string, color: PlanColor )
    {
        this.name = name;
        this.shape = shape;
        this.color = color;
    }

    public getName() : string
    {
        return this.name;
    }

    public getShape() : string
    {
        return this.shape;
    }

    public getColor() : PlanColor
    {
        return this.color;
    }

    public setName( name: string ) : void
    {
        this.name = name;
    }

    public setShape( shape: string ) : void
    {
        this.shape = shape;
    }

    public setColor( color: PlanColor ) : void
    {
        this.color = color;
    }
}