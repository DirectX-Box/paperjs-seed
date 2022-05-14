import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { ColorToolbox } from '../toolboxes';
import { ActionStack } from "../actions/action-stack";
import { ColourAction } from "../actions/colour-action";

export class FillTool extends PaperTool {
    public readonly name = 'Remplir la forme';

    public readonly icon = icon(faFillDrip);

    public constructor(private readonly colorToolbox: ColorToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
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

        if (hit?.item && this.colorToolbox.currentPaperColor!) {
          let stack = ActionStack.getInstance();
          let new_action = new ColourAction(
            hit.item.id,
            this.colorToolbox.currentPaperColor,
            hit.item.fillColor || undefined,
          );

          stack.pushNewAction(new_action);
          hit.item.fillColor = this.colorToolbox.currentPaperColor;
        }
    }
}
