import {MuralObject} from "./MuralObject";
import * as paper from "paper";

export class Extinguisher extends MuralObject
{
    constructor(originX: number, originY: number, height: number, length: number, width: number) {
        super("Etagère", new paper.Point(originX, originY), true, height, length, width);
    }

    // Renvoie le nom de l'objet
    public static getNameGroundObject() : string { return "Extincteur";}

    // Renvoie la couleur du mur
    public getColor(): paper.Color { return new paper.Color("#8BC34A");}
}