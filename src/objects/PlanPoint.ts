export class PlanPoint
{
    // Coordonnée X du point sur un plan 2D.
    private x: number;

    // Coordonnée Y du point sur un plan 2D.
    private y: number;

    constructor( x: number, y: number )
    {
        this.x = x;
        this.y = y;
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }
}