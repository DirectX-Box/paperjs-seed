// Couleur au format RVB.
export class PlanColor
{
    // Valeurs par défaut pour les intensités et la transparence.
    public static readonly DEFAULT_RED   =   0;
    public static readonly DEFAULT_GREEN =   0;
    public static readonly DEFAULT_BLUE  =   0;
    public static readonly DEFAULT_ALPHA = 255;

    // Intensité rouge (0-255).
    private red: number;

    // Intensité verte (0-255).
    private green: number;

    // Intensité bleue (0-255).
    private blue: number;

    // Niveau de transparence (0-255).
    private alpha: number;

    // Constructeur de la couleur.
    constructor( red:   number = PlanColor.DEFAULT_RED,
                 green: number = PlanColor.DEFAULT_GREEN,
                 blue:  number = PlanColor.DEFAULT_BLUE,
                 alpha: number = PlanColor.DEFAULT_ALPHA )
    {
        this.red   =   red;
        this.green = green;
        this.blue  =  blue;
        this.alpha = alpha;
    }

    // Vérifie si la valeur numérique demandée est comprise dans l'intervalle [0, 255].
    private isInRange( color: number ) : boolean
    {
        return ( ( color >= 0 ) && ( color <= 255 ) );
    }

    // Vérifie si l'intensité est valide. Si elle ne l'est pas, on lance une exception RangeError.
    private checkRange( color: number ) : void
    {
        if( !this.isInRange( color ) )
            throw new RangeError( "Color out of range (expected 0-255, got " + color );
    }

    // Retourne l'intensité de rouge de cette couleur.
    public getRed(): number
    {
        return this.red;
    }

    // Retourne l'intensité de vert dans cette couleur.
    public getGreen(): number
    {
        return this.green;
    }

    // Retourne l'intensité de bleu dans cette couleur.
    public getBlue(): number
    {
        return this.blue;
    }

    // Retourne la transparence de cette couleur.
    public getTransparency(): number
    {
        return this.alpha;
    }

    // Retourne toutes les valeurs composant cette couleur dans un tableau.
    public getValues(): Array< number >
    {
        return [ this.getRed(), this.getGreen(), this.getBlue(), this.getTransparency() ];
    }

    // Définit l'intensité de rouge pour cette couleur.
    public setRed( red: number ) : void
    {
        this.checkRange( red );
        this.red = red;
    }

    // Définit l'intensité de vert pour cette couleur.
    public setGreen( green: number ) : void
    {
        this.checkRange( green );
        this.green = green;
    }

    // Définit l'intensité de bleu pour cette couleur.
    public setBlue( blue: number ) : void
    {
        this.checkRange( blue );
        this.blue = blue;
    }

    // Définit la transparence de cette couleur.
    public setTransparency( alpha: number ) : void
    {
        this.checkRange( alpha );
        this.alpha = alpha;
    }

    // Définit la couleur depuis chaque paramètre.
    public setValues( red: number, green: number, blue: number ) : void
    {
        this.setRed( red );
        this.setBlue( blue );
        this.setGreen( green );
    }

    // Définit la couleur depuis chaque paramètre.
    public setValuesAndTransparency( red: number, green: number, blue: number, alpha: number ) : void
    {
        this.setValues( red, green, blue );
        this.setTransparency( alpha );
    }

    // Définit la couleur depuis un tableau.
    public setValuesFromArray( values: Array< number > ) : void
    {
        var count = values.length;
        if( count < 3 )
        {
            throw new RangeError( "Not enough values to set the color (expected 3-4, got " + count );
        }
        else if( count > 4 )
        {
            console.warn( "PlanColor::setValues(): More than 4 values in array! Only the four first will be used." );
        }

        this.setRed(   values[0] );
        this.setGreen( values[1] );
        this.setBlue(  values[2] );
        if( count >= 4 )
            this.setTransparency( values[3] );
    }
}