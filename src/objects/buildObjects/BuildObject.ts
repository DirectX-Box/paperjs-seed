import * as paper from "paper";

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
    public getNameBuildObject() : string { return this.name; }

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
}