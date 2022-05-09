import { DrawAdapterInterface } from "./DrawAdapterInterface";
import { PlanObject } from "../PlanObject";
import { PlanPoint } from "../PlanPoint";
import { PlanShape } from "../PlanShape";
import * as paper from "paper";
import {Size} from "paper/dist/paper-core";

class DrawAdapterPaperJS implements DrawAdapterInterface
{
    private paperShapes: Map< PlanObject, paper.Shape >;

    public constructor()
    {
        this.paperShapes = new Map([]);
    }

    // Efface l'objet passé en paramètre.
    public deleteObject( object: PlanObject ) : void
    {
        var shape = this.paperShapes.get( object );
        if( shape )
        {
            shape.remove();
        }

        this.paperShapes.delete( object );
    }

    // Dessine l'objet passé en paramètre.
    public drawObject( object: PlanObject ) : void
    {
        var shapeToDraw = object.getShape();
        switch( shapeToDraw.getCount() )
        {
            case 2: {
                this.drawRectangle( object );
                break;
            }
        }
    }

    // Dessine un rectangle PaperJS.
    private drawRectangle( object: PlanObject ) : void
    {
        var points = object.getShape().getPoints();
        var p1 = new paper.Point( points[0].getX(), points[0].getY() );
        var p2 = new paper.Point( points[1].getX(), points[1].getY() );
        var shapeToDraw = new paper.Shape.Rectangle( p1, p2 )
        var shape = this.paperShapes.get( object );
        if( shape )
        {
            shape.replaceWith( shapeToDraw );
        }
        else
        {
            this.paperShapes.set( object, shapeToDraw );
        }
    }
}