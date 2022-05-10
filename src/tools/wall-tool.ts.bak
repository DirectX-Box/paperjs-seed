import { icon } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import {BuildObjectToolbox} from '../toolboxes';
import { BuildObject } from '../objects'

export class WallTool extends PaperTool {
    public readonly name = 'Tracer mur';

    public readonly icon = icon(faHouse);

    // Forme de l'objet
    public objectShape : InstanceType< typeof paper.Path.Rectangle > | null = null;

    public initPos : InstanceType< typeof paper.Point > | null = null;

    // Objet de construction
    public buildObject : InstanceType< typeof BuildObject> | null = null;

    public constructor(private readonly buildObjectToolbox: BuildObjectToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
    }

    public enable(): void {
        super.enable();

        this.buildObjectToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.buildObjectToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if ( hit == null || hit.item == null ) {
            this.initPos = event.point;
            this.buildObject = this.buildObjectToolbox.buildObject;
            this.objectShape = this.buildObject!.createShape(this.initPos);
            this.objectShape.fillColor = this.buildObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        // const pos = paper.project.activeLayer.hitTest(event.point);
        if( this.initPos != null )
        {
            this.objectShape?.remove();
            this.objectShape = this.buildObject!.updateShape(this.initPos, event.point);
            this.objectShape.fillColor = this.buildObject!.getColor();
            this.objectShape.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
