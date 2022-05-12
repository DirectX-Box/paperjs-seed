import { icon } from "@fortawesome/fontawesome-svg-core";
import { PaperTool } from "../toolbar";
import * as paper from "paper";
import { Plan } from "../plan";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";

export class SelectTool extends PaperTool
{
    public readonly name = "Sélection";

    public readonly icon = icon( faFillDrip );

    private multiSelection : boolean;

    private plan : Plan;

    constructor()
    {
        super();
        this.multiSelection = false;
        this.plan = Plan.getInstance();

        this.paperTool.onKeyDown = this.onKeyDown.bind( this );
        this.paperTool.onKeyUp = this.onKeyUp.bind( this );
        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
    }

    public enable(): void {
        super.enable();
    }

    public disable(): void {
        super.disable();
        this.plan.clearSelection();
    }

    public onKeyDown( event: paper.KeyEvent ) : void
    {
        switch( event.key )
        {
            case "control": {
                this.multiSelection = true;
                break;
            }

            case "delete": {
                this.plan.deleteSelectedObjects();
                break;
            }
        }
    }

    public onKeyUp( event: paper.KeyEvent ) : void
    {
        switch( event.key )
        {
            case "control": {
                this.multiSelection = false;
                break;
            }
        }
    }

    public onMouseDown( event: paper.ToolEvent ): void {

        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit != null && hit.item != null ) {

            let path = hit.item as paper.Path;

            if( this.plan.isBuilding( path ) )
            {
                this.plan.clearSelection();
                return;
            }

            if( this.multiSelection )
            {
                this.plan.toggleSelection( path );
            }
            else
            {
                this.plan.clearSelection();
                this.plan.selectObject( path );
            }
        }
        else
        {
            this.plan.clearSelection();
        }

    }
}