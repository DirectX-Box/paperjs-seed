import { DrawAdapterInterface } from "./DrawAdapterInterface";
import { PlanObject } from "../PlanObject";
import { PlanPoint } from "../PlanPoint";
import * as paper from "paper";

export class DrawAdapterPaperJS implements DrawAdapterInterface
{
    private readonly BYTE_COLOR_TO_FLOAT = ( 1 / 255 );

    // Stocke toutes les figures du plan.
    private paperPaths: Map< PlanObject, paper.Path >;

    // Path sélectionné.
    private selectedPath: paper.Path;

    // Constructeur de l'adaptateur.
    public constructor()
    {
        this.paperPaths = new Map();
        this.selectedPath = new paper.Path([0,0]);
    }

    // Efface l'objet passé en paramètre.
    public deleteObject( object: PlanObject ) : void
    {
        let shape = this.paperPaths.get( object );
        if( shape )
        {
            shape.remove();
        }

        this.paperPaths.delete( object );
    }

    // Dessine l'objet passé en paramètre.
    public drawObject( object: PlanObject ) : void
    {
        let shapeToDraw = object.getShape();
        switch( shapeToDraw.getType() )
        {
            case "circle": {
                this.drawCircle( object );
                break;
            }

            default: {
                this.drawShape( object );
                break;
            }
        }
    }

    // Dessine un cercle PaperJS.
    private drawCircle( object: PlanObject ) : void
    {
        let origin = this.paperPointFromPlanPoint( object.getOrigin() );
        let shapeToDraw = new paper.Path.Circle( origin, object.getShape().getRadius() );
        shapeToDraw.selected = true;

        this.fillColor( shapeToDraw, object );

        let shape = this.paperPaths.get( object );
        if( shape )
        {
            shape.replaceWith( shapeToDraw )
        }
        else
        {
            this.paperPaths.set( object, shapeToDraw );
        }

        this.selectPath( shapeToDraw );
    }

    // Dessine une forme générique PaperJS.
    private drawShape( object: PlanObject ) : void
    {
        let points = object.getShape().getPoints();
        let pathToDraw = new paper.Path();

        for( let point of points )
        {
            let truePoint = point.toPosition( object.getOrigin() );
            pathToDraw.add( this.paperPointFromPlanPoint( truePoint ) );
        }

        this.fillColor( pathToDraw, object );

        let shape = this.paperPaths.get( object );
        if( shape )
        {
            shape.replaceWith( pathToDraw );
        }
        else
        {
            this.paperPaths.set( object, pathToDraw );
        }

        this.selectPath( pathToDraw );
    }

    // Remplit la figure passée en paramètre avec la couleur de l'objet.
    private fillColor( path: paper.Path, obj: PlanObject )
    {
        let objColor = obj.getColor();
        let color = new paper.Color( objColor.getRed() * this.BYTE_COLOR_TO_FLOAT,
                                     objColor.getGreen() * this.BYTE_COLOR_TO_FLOAT,
                                     objColor.getBlue() * this.BYTE_COLOR_TO_FLOAT,
                                     objColor.getTransparency() * this.BYTE_COLOR_TO_FLOAT );
        path.fillColor = color;
    }

    // Convertit un PlanPoint vers un point PaperJS (paper.Point).
    private paperPointFromPlanPoint( point: PlanPoint ) : paper.Point
    {
        return new paper.Point( point.getX(), point.getY() );
    }

    private selectPath( path: paper.Path ) : void
    {
        this.selectedPath.selected = false;
        path.selected = true;
        this.selectedPath = path;
    }
}