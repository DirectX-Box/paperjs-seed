export class PlanBuilding
{
    // Largeur du bâtiment.
    private width: number;

    // Longueur du bâtiment.
    private length: number;

    // Largeur des murs de l'enceinte.
    private wallWidth : number;

    // Constructeur.
    public constructor( width : number, length : number, wallWidth : number )
    {
        this.width = width;
        this.length = length;
        this.wallWidth = wallWidth;
    }

    // Retourne la largeur du bâtiment.
    public getWidth() : number
    {
        return this.width;
    }

    // Retourne la longueur du bâtiment.
    public getLength() : number
    {
        return this.length;
    }

    // Retourne la largeur de murs de l'enceinte.
    public getWallWidth() : number
    {
        return this.wallWidth;
    }
}