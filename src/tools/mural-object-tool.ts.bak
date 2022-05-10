import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { MuralObjectToolbox } from '../toolboxes';
import {MuralObject} from "../objects";

export class MuralObjectTool extends PaperTool {
    public readonly name = 'Poser un objet au sol';

    public readonly icon = icon(faFireExtinguisher);

    public objectShape : InstanceType< typeof paper.Path > | null = null;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    // Objet au sol
    public muralObject : InstanceType< typeof MuralObject> | null = null;

    public constructor(private readonly muralObjectToolbox: MuralObjectToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
    }

    public enable(): void {
        super.enable();

        this.muralObjectToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.muralObjectToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;
            this.muralObject = this.muralObjectToolbox.muralObject;
            this.objectShape = this.muralObject!.createShape(this.initPos);
            this.objectShape.fillColor = this.muralObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        if( this.initPos != null )
        {
            this.objectShape?.remove();
            this.objectShape = this.muralObject!.updateShape(this.initPos, event.point);
            this.objectShape.fillColor = this.muralObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
