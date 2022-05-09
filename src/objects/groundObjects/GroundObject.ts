import { PlanObject } from "../PlanObject";
import { PlanPoint } from "../PlanPoint";
import * as paper from "paper";
import {Size} from "paper/dist/paper-core";
import { PlanShape } from "../PlanShape";

export abstract class GroundObject extends PlanObject {
    // Nom de l'objet
    protected name: string;
    // Point d'origine de l'objet
    protected origin: PlanPoint;
    // True si la taille peut être modifié
    protected canBeExtended: boolean;
    // hauteur de l'objet;
    protected height: number;
    // longueur de l'objet
    protected length: number;
    // largeur de l'objet
    protected width: number;

    // Constructeur d'un objet de construction
    constructor(name: string, origin: PlanPoint, canBeExtended: boolean, height: number, length: number, width: number) {
        super();
        this.name = name;
        this.origin = origin;
        this.canBeExtended = canBeExtended;
        this.height = height;
        this.length = length;
        this.width = width;
    }

    // *************** GETTER ********************
    // Renvoie l'objet de construction
    public getGroundObject() : GroundObject { return this; }

    // Renvoie le nom de l'objet de construction
    public static getNameGroundObject() : string { return ""; }

    // Renvoie l'origine de l'objet de construction
    public getOriginGroundObject() : PlanPoint { return this.origin; }

    // Renvoie si l'objet peut être modifié en taille
    public canBeExtendedGroundObject() : boolean { return this.canBeExtended; }

    // Renvoie la hauteur de l'objet de construction
    public getHeightGroundObject() : number { return this.height; }

    // Renvoie la longueur de l'objet de construction
    public getLengthGroundObject() : number { return this.length; }

    // Renvoie la largeur de l'objet de construction
    public getWidthGroundObject() : number { return this.width; }

    // *************** SETTER ********************
    public setLength(length: number): void { this.length = length; }

    public setWidth(width: number): void { this.width = width; }

    // *************** FUNCTIONS ********************
    // Renvoie la couleur de base de l'objet
    public getColor(): paper.Color { return new paper.Color("");}

    // Créer la forme initiale
    public createShape(origin : PlanPoint) : PlanShape
    {
        // return new paper.Path.Rectangle(origin, new Size(this.length, this.width));
        return new PlanShape();
    }

    // Met à jour la taille de la forme initiale
    public updateShape(origin : paper.Point, eventPoint : paper.Point) : paper.Path
    {
        return new paper.Path.Rectangle(origin, new Size(eventPoint.x - origin.x, this.width));
    }
}