import * as paper from 'paper';
import { DrawAdapterPaperJS } from '../objects/adapters/DrawAdapterPaperJS';
import { ObjectDefinition } from '../objects/ObjectDefinition';
import { ObjectInstancesManager } from '../objects/ObjectInstancesManager';
import { PlanPoint } from '../objects/PlanPoint';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { BuildingToolbox } from '../toolboxes/building-toolbox';
import { ObjectToolbox } from '../toolboxes/object-toolbox';
import { BuildingTool } from '../tools/building-tool';
import { ObjectTool } from '../tools/object-tool';
import { SelectTool } from '../tools/select-tool';

export class Plan {

    // Instance unique du plan.
    private static instance : Plan;

    // Figure du bâtiment.
    private buildingPath? : paper.Path;

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

        const buildingToolBox = new BuildingToolbox();
        toolboxes.addToolbox( buildingToolBox );

        toolbar.addTool( new SelectTool() );
        toolbar.addTool( new BuildingTool( buildingToolBox ) );

        let defs = this.manager.readDefinitions();

        for( let category of defs.keys() )
        {
            let toolBox = new ObjectToolbox( category.getName(), defs.get( category )! )
            toolboxes.addToolbox( toolBox );
            toolbar.addTool( new ObjectTool( category.getName(), toolBox ) );
        }
    }

    // Vérifie si un bâtiment peut être créé.
    public canBuildingBeCreated() : boolean
    {
        return ( !this.buildingPath );
    }

    // Crée un bâtiment.
    public createBuilding( width : number, length : number, wallWidth : number ) : void
    {
        if( !this.canBuildingBeCreated )
            return;

        this.manager.createBuilding( width, length, wallWidth );
        this.buildingPath = this.getLastPath();
    }

    // Crée un nouvel objet.
    public createObject( objDef : ObjectDefinition, point: paper.Point ) : number
    {
        let planpoint = this.planPointFromPaperPoint( point );
        let id = this.manager.createObjectFromDefinition( objDef, planpoint );
        this.manager.drawObject( id );
        let createdPath = this.getLastPath();
        this.paths.set( createdPath as paper.Path , id );
        return id;
    }

    // Libère toute figure sélectionnée.
    public clearSelection() : void
    {
        this.manager.clearSelection();
    }

    // Supprime l'objet.
    public deleteObject( path: paper.Path ) : void
    {
        this.manager.removeObject( this.getObjectId( path ) );
    }

    // Supprime les objets sélectionnés.
    public deleteSelectedObjects() : void
    {
        let paths = paper.project.activeLayer.getItems( {
            selected: true,
            class: paper.Path,
            recursive: true
        } );

        for( let path of paths )
        {
            this.deleteObject( path as paper.Path );
        }
    }

    // Vérifie que le Path passé en paramètre est le bâtiment.
    public isBuilding( path: paper.Path ) : boolean
    {
        return ( path == this.buildingPath );
    }

    public isInsideBuilding( path: paper.Path ) : boolean
    {
        if( !this.buildingPath )
        {
            return false;
        }
        else
        {
            return path.isInside( this.buildingPath.bounds ) && !path.intersects( this.buildingPath );
        }
    }

    // Redimensionne une figure.
    public resizePath( path: paper.Path, from: paper.Point, to : paper.Point, isInitial : boolean ) : void
    {
        let obj = this.manager.getObject( this.getObjectId( path ) );
        if( !obj.isPermanent() || isInitial )
            path.bounds = new paper.Rectangle( from, to );
    }

    // Sélectionne l'objet.
    public selectObject( path: paper.Path ) : void
    {
        this.manager.selectObject( this.getObjectId( path ) );
    }

    public toggleSelection( path: paper.Path )
    {
        this.manager.toggleSelection( this.manager.getObject( this.getObjectId( path ) ) );
    }

    // Met à jour l'objet.
    public updateObject( path: paper.Path ) : void
    {
        let id = this.getObjectId( path );

        let obj = this.manager.getObject( id );
        let objPath = obj.getShape();
        obj.setOrigin( this.planPointFromPaperPoint( path.position ) );
        objPath.clearShape();
        for( let segment of path.segments )
        {
            let relativeX = segment.point.x - path.position.x;
            let relativeY = segment.point.y - path.position.y;
            objPath.addPoint( new PlanPoint( relativeX, relativeY ) );
        }
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

    // Retourne l'identifiant de l'objet selon sa figure PaperJS.
    private getObjectId( path : paper.Path ) : number
    {
        console.log(this.paths, path)
        let res = this.paths.get( path );
        if( !res )
        {
            throw new Error( "Unknown object." );
        }
        return res;
    }
}
