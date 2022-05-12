import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { PaperTool } from "../toolbar";
import * as paper from "paper";
import { Plan } from "../plan";
import { ObjectToolbox } from "../toolboxes/object-toolbox";
import { ActionStack } from "../actions/action-stack";
import { AddFurnitureAction } from "../actions/add-furniture-action";
import { PlanPoint } from "../objects/PlanPoint";
import { Rectangle } from "paper/dist/paper-core";

export class ObjectTool extends PaperTool
{
    // Nom de l'outil.
    public readonly name;

    // Icône de l'outil.
    public readonly icon = icon(faHouse);

    // Si l'outil est en cours de dessin.
    private isDrawing : boolean;

    // Dernière figure tracée.
    private lastPath? : paper.Path;

    // Instance du plan.
    private plan : Plan;

    // Constructeur.
    constructor( name: string, private readonly objToolBox: ObjectToolbox )
    {
        super();
        this.isDrawing = false;
        this.name = name;
        this.plan = Plan.getInstance();

        this.paperTool.onKeyDown = this.onKeyDown.bind( this );
        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
        this.paperTool.onMouseDrag = this.onMouseDrag.bind( this );
        this.paperTool.onMouseUp = this.onMouseUp.bind( this );
    }

    public enable(): void {
        super.enable();

        this.objToolBox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.objToolBox.visible = false;
        this.isDrawing = false;
    }

    public onKeyDown( event: paper.KeyEvent ) : void
    {
        if( this.lastPath && this.lastPath.selected == true && event.key == "delete" )
        {
            this.plan.clearSelection();
            this.plan.deleteObject( this.lastPath );
            this.lastPath = undefined;
        }
    }

    public onMouseDown( event: paper.ToolEvent ): void {

        // Si je viens de finir de dessiner, ne pas re-créer un objet au
        // prochain clic, déselectionnons simplement l'objet.
        if( this.isDrawing )
        {
            this.isDrawing = false;
            this.plan.clearSelection();
            return;
        }

        const hit = paper.project.activeLayer.hitTest( event.downPoint );

        if ( hit != null && hit.item != null ) {

            let hitPath = hit.item as paper.Path;
            if( hitPath && this.plan.isBuilding( hitPath ) && hit.type != "stroke" )
            {
                this.isDrawing = true;

                let currentObj = this.objToolBox.getCurrentObject();
            /*this.buildObject = this.buildObjectToolbox.buildObject;
            this.currentObjShape = this.buildObject!.createShape(this.initPos);
            this.currentObjShape.fillColor = this.buildObject!.getColor();
            this.currentObjShape.selected = true;*/
                let createdObj = this.plan.createObject( currentObj, event.downPoint );

                let stack = ActionStack.getInstance();
                let point = new PlanPoint(event.downPoint.x, event.downPoint.y);
                let new_action = new AddFurnitureAction(createdObj, currentObj, point);

                console.log(stack, point, new_action)
                stack.pushNewAction(new_action);

                this.lastPath = this.plan.getLastPath();
            }
        }

    }

    public onMouseDrag( event: paper.ToolEvent ): void {

        if( this.lastPath &&this.isDrawing )
        {
            let rect = new Rectangle( event.downPoint, event.point );

            // Drawing glitches out if width or height is 0, so don't resize.
            if( rect.width == 0 || rect.height == 0 )
                return;

            this.lastPath.bounds = rect;
        }
    }

    public onMouseUp( event : paper.ToolEvent ): void {

        if( this.lastPath && this.isDrawing )
        {
            this.onMouseDrag( event );
            if( this.plan.isInsideBuilding( this.lastPath ) )
            {
                this.plan.updateObject( this.lastPath );
            }
            else
            {
                    this.plan.deleteObject( this.lastPath );
                    this.isDrawing = false;
            }
        }
    }
}
