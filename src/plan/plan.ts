import * as paper from 'paper';
import { DrawAdapterPaperJS } from '../objects/adapters/DrawAdapterPaperJS';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';
import { PlanPoint } from '../objects/PlanPoint';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { ObjectToolbox } from '../toolboxes/object-toolbox';
import { ObjectTool } from '../tools/object-tool';
import { SelectTool } from '../tools/select-tool';

export class Plan {

    // Instance unique du plan.
    private static instance : Plan;

    // Gestionnaire d'objets.
    private manager : ObjectInstancesManager;

    // Liste des figures.
    private paths: Map< paper.Path, number >

    // Constructeur (privé).
    private constructor()
    {
        this.manager = ObjectInstancesManager.init( new DrawAdapterPaperJS() );
        this.paths = new Map();
    }

    // Retourne l'instance du Plan.
    public static getInstance() : Plan
    {
        if( !Plan.instance )
            Plan.instance = new Plan();
        return Plan.instance;
    }

    // Initialise le plan.
    public initialize( toolboxes : ToolboxesContainer, toolbar: Toolbar ): void {

        paper.view.center = new paper.Point(0, 0);

        // const decagon = new paper.Path.RegularPolygon(new paper.Point(0, 0), 10, 200);

        // decagon.fillColor = new paper.Color('#e9e9ff');
        // decagon.selected = true;

        toolbar.addTool( new SelectTool );

        let defs = this.manager.readDefinitions();

        for( let category of defs.keys() )
        {
            let toolBox = new ObjectToolbox( category.getName(), defs.get( category )! )
            toolboxes.addToolbox( toolBox );
            toolbar.addTool( new ObjectTool( category.getName(), toolBox ) );
        }
    }

    // Crée un nouvel objet.
    public createObject( objDef : ObjectDefinition, point: paper.Point ) : number
    {
        let planpoint = this.planPointFromPaperPoint( point );
        let id = this.manager.createObjectFromDefinition( objDef, planpoint );
        this.manager.drawObject( id );
        let createdPath = this.getLastPath();
        if( !createdPath )
        {
            throw new Error( "Could not get created path." );
        }
        this.paths.set( createdPath as paper.Path , id );
        return id;
    }

    // Libère toute figure sélectionnée.
    public clearSelection() : void
    {
        this.manager.clearSelection();
    }

    // Redimensionne l'objet.
/*    public resizeObject( path: paper.Path, origin: paper.Point, mouse: paper.Point, isInitial: boolean = false ) : paper.Point
    {
        let id = this.paths.get( path );
        if( !id )
        {
            throw new Error( "Unknown object." );
        }


        path.scale(origin.x / mouse.x, origin.y / mouse.y );

        let newPos = path.bounds.topLeft;

        let obj = this.manager.getObject( id );
        if( !obj.isPermanent() || ( obj.isPermanent() && isInitial ) )
        {
            let objPath = obj.getShape();
            obj.setOrigin( this.planPointFromPaperPoint( path.bounds.topLeft ) );
            objPath.clearShape();
            for( let segment of path.segments )
            {
                objPath.addPoint( this.planPointFromPaperPoint( segment.point ) );
            }
            // this.manager.drawObject( id );
        }

        return newPos;
    }
*/

    // Sélectionne l'objet.
    public selectObject( path: paper.Path ) : void
    {
        let id = this.paths.get( path );
        if( !id )
        {
            throw new Error( "Unknown object." );
        }
        this.manager.selectObject( id );
    }

    // Met à jour l'objet.
    public updateObject( path: paper.Path, isInitial: boolean = false ) : paper.Point
    {
        let id = this.paths.get( path );
        if( !id )
        {
            throw new Error( "Unknown object." );
        }

        let obj = this.manager.getObject( id );
        if( !obj.isPermanent() || ( obj.isPermanent() && isInitial ) )
        {
            let objPath = obj.getShape();
            obj.setOrigin( this.planPointFromPaperPoint( path.bounds.topLeft ) );
            objPath.clearShape();
            for( let segment of path.segments )
            {
                objPath.addPoint( this.planPointFromPaperPoint( segment.point ) );
            }
            this.manager.drawObject( id );
        }

        return path.bounds.topLeft;
    }

    // Convertit un point PaperJS vers un PlanPoint.
    private planPointFromPaperPoint( point: paper.Point ) : PlanPoint
    {
        return new PlanPoint( point.x, point.y );
    }

    // Retourne la dernière instance Path créée.
    public getLastPath() : paper.Path
    {
        return paper.project.activeLayer.children.at( -1 ) as paper.Path;
    }
}
