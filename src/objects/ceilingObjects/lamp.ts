import {CeilingObject} from "./CeilingObject";
import * as paper from "paper";

export class Lamp extends CeilingObject
{
    constructor(originX: number, originY: number, height: number, length: number, width: number) {
        super("Etagère", new paper.Point(originX, originY), true, height, length, width);
    }

    // Renvoie le nom de l'objet
    public static getNameGroundObject() : string { return "Lampe";}

    // Renvoie la couleur du mur
    public getColor(): paper.Color { return new paper.Color("#FFC107");}
}