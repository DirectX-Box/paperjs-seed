import { PlanPoint } from "./PlanPoint";

export class PlanShape
{
    // Liste des points de cette figure. Une figure est composée de plusieurs points…
    private mesh: Array< PlanPoint >;

    // Le nombre de points dans cette figure.
    private count: number;

    // Rayon du cercle dans le cas d'une figure à un point unique.
    private radius: number;

    // Type de figure.
    private type: string;

    // Constructeur vide. Les formes sont construites par itération.
    constructor()
    {
        this.mesh = [];
        this.count = 0;
        this.radius = 0;
        this.type = "";
    }

    // Met à jour le nombre de points dans l'objet PlanShape.
    private updateCount() : number
    {
        this.count = this.mesh.length;
        return this.getCount();
    }

    // Retourne le nombre de points de cette forme.
    public getCount() : number
    {
        return this.count;
    }

    // Retourne une copie du tableau des points en lecture seule.
    public getPoints() : Array< PlanPoint >
    {
        const constMesh = [ ... this.mesh ]; // Copie de this.mesh dans constMesh.
        return constMesh;
    }

    // Retourne le rayon de la figure (uniquement utile pour un cercle).
    public getRadius() : number
    {
        return this.radius;
    }

    // Retourne le type de la figure.
    public getType() : string
    {
        return this.type;
    }

    // Fixe le rayon de la figure (uniquement utile pour un cercle).
    public setRadius( radius: number ) : void
    {
        this.radius = radius;
    }

    // Fixe le type de la figure.
    public setType( type: string ) : void
    {
        this.type = type;
    }

    // Ajoute un point à la figure.
    public addPoint( point: PlanPoint ): number
    {
        this.mesh.push( point );
        return this.updateCount();
    }

    // Retire le dernier point de la figure.
    public removeLastPoint() : number
    {
        this.mesh.pop();
        return this.updateCount();
    }

    // Retire un point par index.
    public removeByIndex( index: number ) : number
    {
        this.mesh.splice( index, 1 );
        return this.updateCount();
    }

    // Efface la figure.
    public clearShape()
    {
        this.mesh = []
        this.count = 0
    }
}