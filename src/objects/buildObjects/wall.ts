import {BuildObject} from "./BuildObject";
import * as paper from "paper";

export class Wall extends BuildObject
{
    public wall : InstanceType< typeof paper.Path.Rectangle > | null = null;

    constructor(originX: number, originY: number, height: number, length: number, width: number) {
        super("Mur", new paper.Point(originX, originY), true, height, length, width);
    }

    //private setColor(): void {}
}