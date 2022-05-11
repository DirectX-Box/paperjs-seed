import * as paper from 'paper';
import { DrawAdapterPaperJS } from '../objects/adapters/DrawAdapterPaperJS';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';
import { PlanPoint } from '../objects/PlanPoint';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { ObjectToolbox } from '../toolboxes/object-toolbox';
import { ObjectTool } from '../tools/object-tool';

export class Plan {

    // Instance unique du plan.
    private static instance : Plan;

    // Gestionnaire d'objets.
    private manager : ObjectInstancesManager;

    // Constructeur (privé).
    private constructor()
    {
        this.manager = ObjectInstancesManager.init( new DrawAdapterPaperJS() );
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

        let defs = this.manager.readDefinitions();

        for( let category of defs.keys() )
        {
            let toolBox = new ObjectToolbox( category.getName(), defs.get( category )! )
            toolboxes.addToolbox( toolBox );
            toolbar.addTool( new ObjectTool( category.getName(), toolBox ) );
        }
    }

    // Crée un nouvel objet.
    public createObject( objDef : ObjectDefinition, point: paper.Point ) : void
    {
        let planpoint = this.planPointFromPaperPoint( point );
        let id = this.manager.createObjectFromDefinition( objDef, planpoint );
        this.manager.drawObject( id );
    }

    public updateObject( id: number, path: paper.Path ) : void
    {
        let obj = this.manager.getObject( id );
        let objPath = obj.getShape();
        obj.setOrigin( this.planPointFromPaperPoint( path.position ) );
        objPath.clearShape();
        for( let segment of path.segments )
        {
            objPath.addPoint( this.planPointFromPaperPoint( segment.point ) );
        }
        this.manager.drawObject( id );
    }

    // Convertit un point PaperJS vers un PlanPoint.
    private planPointFromPaperPoint( point: paper.Point ) : PlanPoint
    {
        return new PlanPoint( point.x, point.y );
    }
}
