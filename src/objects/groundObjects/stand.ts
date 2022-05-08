import {GroundObject} from "./GroundObject";
import * as paper from "paper";

export class Stand extends GroundObject
{
    public wall : InstanceType< typeof paper.Path.Rectangle > | null = null;

    constructor(originX: number, originY: number, height: number, length: number, width: number) {
        super("Stand", new paper.Point(originX, originY), true, height, length, width);
    }

    // Renvoie le nom de l'objet
    public static getNameGroundObject() : string { return "Stand";}

    // Renvoie la couleur du mur
    public getColor(): paper.Color { return new paper.Color("#FF9800");}
}