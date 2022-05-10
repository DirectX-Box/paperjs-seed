import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { CeilingObjectToolbox } from '../toolboxes';
import {CeilingObject} from "../objects";

export class CeilingObjectTool extends PaperTool {
    public readonly name = 'Poser un objet au sol';

    public readonly icon = icon(faBuilding);

    public objectShape : InstanceType< typeof paper.Path > | null = null;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    // Objet au sol
    public ceilingObject : InstanceType< typeof CeilingObject> | null = null;

    public constructor(private readonly ceilingObjectToolbox: CeilingObjectToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
    }

    public enable(): void {
        super.enable();

        this.ceilingObjectToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.ceilingObjectToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;
            this.ceilingObject = this.ceilingObjectToolbox.ceilingObject;
            this.objectShape = this.ceilingObject!.createShape(this.initPos);
            this.objectShape.fillColor = this.ceilingObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        if( this.initPos != null )
        {
            this.objectShape?.remove();
            this.objectShape = this.ceilingObject!.updateShape(this.initPos, event.point);
            this.objectShape.fillColor = this.ceilingObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
