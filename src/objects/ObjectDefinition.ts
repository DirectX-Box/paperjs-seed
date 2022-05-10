import { ObjectCategory } from "./ObjectCategory";
import { PlanColor } from "./PlanColor";

// Définition d'un objet.
export class ObjectDefinition
{
    // Nom de l'objet.
    private name: string;

    // Catégorie de l'objet.
    private category: ObjectCategory;

    // Couleur de l'objet.
    private color: PlanColor;

    constructor( name: string, category: ObjectCategory, color: PlanColor )
    {
        this.name = name;
        this.category = category;
        this.color = color;
    }

    public getName() : string
    {
        return this.name;
    }

    public getCategory() : ObjectCategory
    {
        return this.category;
    }

    public getColor() : PlanColor
    {
        return this.color;
    }

    public setName( name: string ) : void
    {
        this.name = name;
    }

    public setCategory( category: ObjectCategory ) : void
    {
        this.category = category;
    }

    public setColor( color: PlanColor ) : void
    {
        this.color = color;
    }
}