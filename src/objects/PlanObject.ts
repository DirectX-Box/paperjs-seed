import { PlanShape } from "./PlanShape";

export abstract class PlanObject {

    // Figure pour cet objet.
    private shape: PlanShape;

    constructor()
    {
        this.shape = new PlanShape();
    }

    public getShape() : PlanShape
    {
        return this.shape;
    }

}