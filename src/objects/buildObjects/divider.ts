import {BuildObject} from "./BuildObject";
import * as paper from "paper";

export class Divider extends BuildObject
{
    public wall : InstanceType< typeof paper.Path.Rectangle > | null = null;

    constructor(originX: number, originY: number, height: number, length: number, width: number) {
        super("Cloison", new paper.Point(originX, originY), true, height, length, width);
    }

    // Renvoie le nom de l'objet
    public static getNameBuildObject() : string { return "Cloison";}

    //private setColor(): void {}
    public getNameBuildObject() : string { return "Cloison"; }

    // Renvoie la couleur d'une cloison
    public getColor(): paper.Color { return new paper.Color("#9E9E9E");}
}