import * as paper from "paper";
import {Size} from "paper/dist/paper-core";

export abstract class BuildObject {
    // Nom de l'objet
    protected name: string;
    // Point d'origine de l'objet
    protected origin: InstanceType< typeof paper.Point > | null = null;
    // True si la taille peut être modifié
    protected canBeExtended: boolean;
    // hauteur de l'objet;
    protected height: number;
    // longueur de l'objet
    protected length: number;
    // largeur de l'objet
    protected width: number;

    // Constructeur d'un objet de construction
    constructor(name: string, origin: paper.Point, canBeExtended: boolean, height: number, length: number, width: number) {
        this.name = name;
        this.origin = origin;
        this.canBeExtended = canBeExtended;
        this.height = height;
        this.length = length;
        this.width = width;
    }

    // *************** GETTER ********************
    // Renvoie l'objet de construction
    public getBuildObject() : BuildObject { return this; }

    // Renvoie le nom de l'objet de construction
    public static getNameBuildObject() : string { return ""; }

    // Renvoie l'origine de l'objet de construction
    //public getOriginBuildObject() : paper.Point { return this.origin; }

    // Renvoie si l'objet peut être modifié en taille
    public canBeExtendedBuildObject() : boolean { return this.canBeExtended; }

    // Renvoie la hauteur de l'objet de construction
    public getHeightBuildObject() : number { return this.height; }

    // Renvoie la longueur de l'objet de construction
    public getLengthBuildObject() : number { return this.length; }

    // Renvoie la largeur de l'objet de construction
    public getWidthBuildObject() : number { return this.width; }

    // *************** SETTER ********************
    public setLength(length: number): void { this.length = length; }

    public setWidth(width: number): void { this.width = width; }

    // *************** FUNCTIONS ********************
    // Renvoie la couleur de base de l'objet
    public getColor(): paper.Color { return new paper.Color("");}

    // Créer la forme initiale
    public createShape(origin : paper.Point) : paper.Path
    {
        return new paper.Path.Rectangle(origin, new Size(this.length, this.width));
    }

    // Met à jour la taille de la forme initiale
    public updateShape(origin : paper.Point, eventPoint : paper.Point) : paper.Path
    {
        return new paper.Path.Rectangle(origin, new Size(eventPoint.x - origin.x, this.width));
    }
}