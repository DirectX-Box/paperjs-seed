import { icon } from "@fortawesome/fontawesome-svg-core";
import { PaperTool } from "../toolbar";
import * as paper from "paper";
import { Plan } from "../plan";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";
import { Point, Rectangle } from "paper/dist/paper-core";

export class SelectTool extends PaperTool
{
    public readonly name = "Sélection";

    public readonly icon = icon( faFillDrip );

    private backupBounds : paper.Rectangle;

    private canResize : boolean;

    private multiSelection : boolean;

    private resizeOrigin : paper.Point;

    private resizePath? : paper.Path;

    private plan : Plan;

    constructor()
    {
        super();
        this.backupBounds = new Rectangle( 0, 0, 0, 0 );
        this.canResize = false;
        this.multiSelection = false;
        this.plan = Plan.getInstance();
        this.resizeOrigin = new Point( 0, 0 );

        this.paperTool.onKeyDown = this.onKeyDown.bind( this );
        this.paperTool.onKeyUp = this.onKeyUp.bind( this );
        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
        this.paperTool.onMouseDrag = this.onMouseDrag.bind( this );
        this.paperTool.onMouseUp = this.onMouseUp.bind( this );
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

        const hit = paper.project.activeLayer.hitTest( event.downPoint );

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

                console.log( "Selected" );

                const hitCorner = path.hitTest( event.downPoint, {
                    bounds: true
                });

                if( hitCorner )
                    console.log( hitCorner.type );

                if( hitCorner && hitCorner.type == "bounds" )
                {

                    if( hitCorner.point.equals( path.bounds.topLeft ) )
                        this.resizeOrigin = path.bounds.bottomRight;

                    else if( hitCorner.point.equals( path.bounds.topRight ) )
                        this.resizeOrigin = path.bounds.bottomLeft;

                    else if( hitCorner.point.equals( path.bounds.bottomLeft ) )
                        this.resizeOrigin = path.bounds.topRight;

                    else if( hitCorner.point.equals( path.bounds.bottomRight ) )
                        this.resizeOrigin = path.bounds.topLeft;

                    else
                        return;

                    this.backupBounds = path.bounds.clone();
                    this.resizePath = path;
                    this.canResize = true;
                }
            }
        }
        else
        {
            this.plan.clearSelection();
        }
    }

    public onMouseDrag( event: paper.ToolEvent ) : void
    {
        if( this.multiSelection || !this.canResize || !this.resizePath )
            return;

        const rect = new Rectangle( this.resizeOrigin, event.point );

        if( rect.width == 0 || rect.height == 0 )
            return;

        this.resizePath.bounds = rect;
    }

    public onMouseUp( event: paper.ToolEvent ) : void
    {
        this.onMouseDrag( event );

        if( this.canResize && this.resizePath )
        {
            if( this.plan.isInsideBuilding( this.resizePath ) )
                this.plan.updateObject( this.resizePath );
            else
                this.resizePath.bounds = this.backupBounds;
        }

        this.canResize = false;
    }
}