import { DrawAdapterInterface } from "./DrawAdapterInterface";
import { PlanObject } from "../PlanObject";
import { PlanPoint } from "../PlanPoint";
import * as paper from "paper";
import { PlanBuilding } from "../PlanBuilding";
import { Point } from "paper/dist/paper-core";

export class DrawAdapterPaperJS implements DrawAdapterInterface
{
    // Constante de conversion d'une intensité de couleur en octet (0 - 255) vers un flottant.
    private readonly BYTE_COLOR_TO_FLOAT = ( 1 / 255 );

    // Constante de la couleur des murs principaux.
    private readonly WALL = "#607D8B";

    // Constante de la couleur blanche dans PaperJS.
    private readonly WHITE = "#FFFFFF";

    // Dessin du bâtiment.
    private paperBuilding: paper.Path;

    // Stocke toutes les figures du plan.
    private paperPaths: Map< PlanObject, paper.Path >;

    // Path sélectionné.
    private selectedPaths: Map< PlanObject, paper.Path >;

    // Constructeur de l'adaptateur.
    public constructor()
    {
        this.paperBuilding = new paper.Path();
        this.paperPaths = new Map();
        this.selectedPaths = new Map();
    }

    // Efface la sélection.
    public clearSelection() : void
    {
        for( let path of this.paperPaths.values() )
        {
            path.selected = false;
        }

        this.selectedPaths.clear();
    }

    // Supprime le bâtiment.
    public deleteBuilding() : void
    {
        this.paperBuilding.remove();
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

    // Dessine le bâtiment passé en paramètre.
    public drawBuilding( building: PlanBuilding ): void
    {
        this.deleteBuilding();
        let w = building.getWidth();
        let l = building.getLength();
        let size = new paper.Size( l, w );
        let topLeftX = paper.project.activeLayer.position.x - l / 2;
        let topLeftY = paper.project.activeLayer.position.x - w / 2;
        this.paperBuilding = new paper.Path.Rectangle( new Point( topLeftX, topLeftY ), size );
        this.paperBuilding.strokeColor = new paper.Color( this.WALL );
        this.paperBuilding.strokeWidth = building.getWallWidth();
        this.paperBuilding.fillColor = new paper.Color( this.WHITE );
        this.paperBuilding.sendToBack();
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

    // Supprime cet objet de la sélection.
    public removeObjectFromSelection( object: PlanObject ): void
    {
        const obj = this.selectedPaths.get( object );
        if( obj )
        {
            obj.selected = false;
            this.selectedPaths.delete( object );
        }
    }

    // Sélectionne l'objet passé en paramètre.
    public selectObject( object: PlanObject ) : void
    {
        let path = this.paperPaths.get( object );
        if( !path )
            return;
        
        this.selectPath( object, path );
    }

    // Alterne la sélection de l'objet passé en paramètre.
    public toggleSelectionOnObject( object: PlanObject ): void
    {
        if( this.selectedPaths.get( object ) )
        {
            this.removeObjectFromSelection( object );
        }
        else
        {
            this.selectObject( object );
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

        this.selectPath( object, shapeToDraw );
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

        this.selectPath( object, pathToDraw );
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

    // Sélectionne la figure passée en paramètre.
    private selectPath( object: PlanObject, path: paper.Path ) : void
    {
        path.selected = true;
        path.bringToFront();
        this.selectedPaths.set( object, path );
    }
}