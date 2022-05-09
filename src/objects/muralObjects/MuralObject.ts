import * as paper from "paper";
import {Size} from "paper/dist/paper-core";

export abstract class MuralObject {
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
    public getMuralObject() : MuralObject { return this; }

    // Renvoie le nom de l'objet de construction
    public static getNameMuralObject() : string { return ""; }

    // Renvoie l'origine de l'objet de construction
    //public getOriginMuralObject() : paper.Point { return this.origin; }

    // Renvoie si l'objet peut être modifié en taille
    public canBeExtendedMuralObject() : boolean { return this.canBeExtended; }

    // Renvoie la hauteur de l'objet de construction
    public getHeightMuralObject() : number { return this.height; }

    // Renvoie la longueur de l'objet de construction
    public getLengthMuralObject() : number { return this.length; }

    // Renvoie la largeur de l'objet de construction
    public getWidthMuralObject() : number { return this.width; }

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