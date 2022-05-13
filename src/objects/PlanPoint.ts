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

    // Retourne les coordonnées du point passé en paramètre RELATIVES à cette instance.
    // Exemple :
    // let point = new PlanPoint( 20, 20 );
    // let other = new PlanPoint( 0, 5 );
    // let final = other.fromPosition( point );    // final = [ 20, 25 ]
    public toPosition( position: PlanPoint ) : PlanPoint
    {
        let newX = this.getX() + position.getX();
        let newY = this.getY() + position.getY();
        return new PlanPoint( newX, newY );
    }
}