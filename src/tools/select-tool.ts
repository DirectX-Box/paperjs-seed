import { icon } from "@fortawesome/fontawesome-svg-core";
import { PaperTool } from "../toolbar";
import * as paper from "paper";
import { Plan } from "../plan";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";

export class SelectTool extends PaperTool
{
    public readonly name = "Sélection";

    public readonly icon = icon( faFillDrip );

    private plan : Plan;

    constructor()
    {
        super();
        this.plan = Plan.getInstance();

        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
    }

    public enable(): void {
        super.enable();
    }

    public disable(): void {
        super.disable();
    }

    public onMouseDown( event: paper.ToolEvent ): void {

        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit != null && hit.item != null ) {

            this.plan.selectObject( hit.item as paper.Path );

            /*this.buildObject = this.buildObjectToolbox.buildObject;
            this.currentObjShape = this.buildObject!.createShape(this.initPos);
            this.currentObjShape.fillColor = this.buildObject!.getColor();
            this.currentObjShape.selected = true;*/
        }
        else
        {
            this.plan.clearSelection();
        }

    }
}