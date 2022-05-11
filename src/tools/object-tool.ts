import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { PaperTool } from "../toolbar";
import * as paper from "paper";
import { Plan } from "../plan";
import { ObjectToolbox } from "../toolboxes/object-toolbox";

export class ObjectTool extends PaperTool
{
    public readonly name;

    public readonly icon = icon(faHouse);

    private plan : Plan;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    constructor( name: string, private readonly objToolBox: ObjectToolbox )
    {
        super();
        this.name = name;
        this.plan = Plan.getInstance();

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
    }

    public onMouseDown( event: paper.ToolEvent ): void {

        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;

            this.plan.createObject( this.objToolBox.getCurrentObject(), event.point );

            /*this.buildObject = this.buildObjectToolbox.buildObject;
            this.currentObjShape = this.buildObject!.createShape(this.initPos);
            this.currentObjShape.fillColor = this.buildObject!.getColor();
            this.currentObjShape.selected = true;*/
                
        }

    }

    public onMouseDrag( event: paper.ToolEvent ): void {

        if ( this.initPos != null ) {
            const temp = event;
            temp?.point.x;
            /*this.currentObjShape?.remove();
            this.currentObjShape = this.buildObject!.updateShape(this.initPos, event.point);
            this.currentObjShape.fillColor = this.buildObject!.getColor();
            this.currentObjShape.selected = true;*/
        }
    }

    public onMouseUp( event: paper.ToolEvent ): void {
        const hit = paper.project.activeLayer.hitTest( event.point );
        hit?.point.x;
    }
}