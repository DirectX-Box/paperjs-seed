import { icon } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { Size } from 'paper/dist/paper-core';
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
            /*this.initPos = event.point;
            this.wall = new paper.Path.Rectangle(event.point, new Size(1, 1)); // Will be moved to Wall class.
            this.wall.fillColor = this.buildObjectToolbox.currentPaperColor;
            this.wall.selected = true;*/
            this.initPos = event.point;
            // On récupère le choix de l'utilisateur quant
            this.buildObject = this.buildObjectToolbox.buildObject;
            this.objectShape = new paper.Path.Rectangle(this.initPos, new Size(this.buildObject!.getLengthBuildObject(), this.buildObject!.getWidthBuildObject()));
            this.objectShape.fillColor = new paper.Color(this.buildObject!.getColor());
            this.objectShape.selected = true;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        // const pos = paper.project.activeLayer.hitTest(event.point);
        if( this.initPos != null )
        {
            this.objectShape?.remove();
            this.objectShape = new paper.Path.Rectangle( this.initPos, new Size( event.point.x - this.initPos.x, 25 )); // Will be moved to Wall class.
            this.objectShape.fillColor = new paper.Color(this.buildObject!.getColor());
            this.objectShape.selected = true;
        }
    }

    public onMouseUp(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.point);
        hit?.point.x;
    }
}
