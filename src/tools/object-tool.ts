import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { ObjectDefinition } from "../objects/ObjectDefinition";
import { PlanColor } from "../objects/PlanColor";
import { PlanObject } from "../objects/PlanObject";
import { PlanPoint } from "../objects/PlanPoint";
import { PaperTool } from "../toolbar";
import { BuildObjectToolbox } from "../toolboxes";
import * as paper from "paper";
import { ObjectInstancesManager } from "../objects/ObjectInstancesManager";

export class ObjectTool extends PaperTool
{
    public readonly name = "Construction";

    public readonly icon = icon(faHouse);

    private currentObj : ObjectDefinition;

    private isInitialized : boolean;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    constructor( private readonly objToolBox: BuildObjectToolbox )
    {
        super();
        this.isInitialized = false;
        this.currentObj = new ObjectDefinition( "", "", new PlanColor() );

        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
        this.paperTool.onMouseDrag = this.onMouseDrag.bind( this );
        this.paperTool.onMouseUp = this.onMouseUp.bind( this );
    }

    public setObjectDefinition( objectDef: ObjectDefinition ) : void
    {
        this.currentObj = objectDef;
        this.isInitialized = true;
    }

    public enable(): void {
        super.enable();

        this.objToolBox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.objToolBox.visible = false;
    }

    public onMouseDown( event: paper.ToolEvent ): void {

        if( this.isInitialized )
        {
            const hit = paper.project.activeLayer.hitTest(event.downPoint);

            if ( hit == null || hit.item == null ) {
                this.initPos = event.point;
                let origin = new PlanPoint( this.initPos.x, this.initPos.y );

                /*this.buildObject = this.buildObjectToolbox.buildObject;
                this.objectShape = this.buildObject!.createShape(this.initPos);
                this.objectShape.fillColor = this.buildObject!.getColor();
                this.objectShape.selected = true;*/

                ObjectInstancesManager.getInstance().createObjectFromDefinition(
                    this.currentObj, origin
                );
            }
        }

    }

    public onMouseDrag( event: paper.ToolEvent ): void {

        if ( this.isInitialized ) {
            // const pos = paper.project.activeLayer.hitTest(event.point);

            if ( this.initPos != null ) {
                /*this.objectShape?.remove();
                this.objectShape = this.buildObject!.updateShape(this.initPos, event.point);
                this.objectShape.fillColor = this.buildObject!.getColor();
                this.objectShape.selected = true;*/
            }
        }
    }

    public onMouseUp( event: paper.ToolEvent ): void {
        const hit = paper.project.activeLayer.hitTest( event.point );
        hit?.point.x;
    }
}