import { icon } from '@fortawesome/fontawesome-svg-core';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { GroundObjectToolbox } from '../toolboxes';
import {GroundObject} from "../objects";

export class GroundObjectTool extends PaperTool {
    public readonly name = 'Poser un objet au sol';

    public readonly icon = icon(faChair);

    public objectShape : InstanceType< typeof paper.Path.Rectangle > | null = null;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    // Objet au sol
    public groundObject : InstanceType< typeof GroundObject> | null = null;

    public constructor(private readonly groundObjectToolbox: GroundObjectToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
    }

    public enable(): void {
        super.enable();

        this.groundObjectToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.groundObjectToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;
            this.groundObject = this.groundObjectToolbox.groundObject;
            this.objectShape = this.groundObject!.createShape(this.initPos);
            this.objectShape.fillColor = this.groundObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        // const pos = paper.project.activeLayer.hitTest(event.point);
        if( this.initPos != null )
        {
            this.objectShape?.remove();
            this.objectShape = this.groundObject!.updateShape(this.initPos, event.point);
            this.objectShape.fillColor = this.groundObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
