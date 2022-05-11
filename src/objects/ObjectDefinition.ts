import { PlanColor } from "./PlanColor";
import { PlanPoint } from "./PlanPoint";

// Spécification d'un objet.
export class ObjectDefinition
{
    // Nom de l'objet.
    private name: string;

    // Capacité de l'objet à être déplacé (les murs sont fixes).
    private permanent: boolean;

    // Rayon de l'objet.
    private radius: number;

    // Figure PAR DEFAUT de l'objet.
    private shape: Array< PlanPoint >;

    // Forme de l'objet.
    private type: string;

    // Couleur de l'objet.
    private color: PlanColor;

    // Constructeur.
    constructor( name: string, permanent: boolean, radius: number, shape: Array< PlanPoint >, type: string, color: PlanColor = new PlanColor() )
    {
        this.name = name;
        this.permanent = permanent;
        this.radius = radius;
        this.shape = shape;
        this.type = type;
        this.color = color;
    }

    // Retourne le nom de l'objet.
    public getName() : string
    {
        return this.name;
    }

    // Retourne le rayon de l'objet.
    public getRadius() : number
    {
        return this.radius;
    }

    // Retourne la figure de l'objet.
    public getShape() : Array< PlanPoint >
    {
        return this.shape;
    }

    // Retourne le type de l'objet.
    public getType() : string
    {
        return this.type;
    }

    // Retourne la couleur de l'objet.
    public getColor() : PlanColor
    {
        return this.color;
    }

    // Retourne si cet objet est amovible ou non.
    public isPermanent() : boolean
    {
        return this.permanent;
    }

    // Fixe le nom de l'objet.
    public setName( name: string ) : void
    {
        this.name = name;
    }

    // Fixe le rayon de l'objet.
    public setRadius( radius: number ) : void
    {
        this.radius = radius;
    }

    // Fixe les points qui constituent la figure de l'objet.
    public setShape( shape: Array< PlanPoint > )
    {
        this.shape = shape;
    }

    // Fixe le type de l'objet.
    public setType( type: string ) : void
    {
        this.type = type;
    }

    // Fixe la couleur de l'objet.
    public setColor( color: PlanColor ) : void
    {
        this.color = color;
    }

    // Fixe si cet objet est permanent ou non.
    public setIfPermanent( permanent: boolean )
    {
        this.permanent = permanent;
    }
}