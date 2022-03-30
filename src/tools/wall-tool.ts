import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { Size } from 'paper/dist/paper-core';
import { PaperTool } from '../toolbar';
import { ColorToolbox } from '../toolboxes';

export class WallTool extends PaperTool {
    public readonly name = 'Tracer mur';

    public readonly icon = icon(faFillDrip);

    public wall : InstanceType< typeof paper.Path.Rectangle > | null = null;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    public constructor(private readonly colorToolbox: ColorToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
    }

    public enable(): void {
        super.enable();

        this.colorToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.colorToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;
            this.wall = new paper.Path.Rectangle(event.point, new Size(1, 1)); // Will be moved to Wall class.
            this.wall.fillColor = this.colorToolbox.currentPaperColor;
            this.wall.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        // const pos = paper.project.activeLayer.hitTest(event.point);
        if( this.initPos != null )
        {
            this.wall?.remove();
            this.wall = new paper.Path.Rectangle( this.initPos, new Size( event.point.x - this.initPos.x, 25 )); // Will be moved to Wall class.
            this.wall.fillColor = this.colorToolbox.currentPaperColor;
            this.wall.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
