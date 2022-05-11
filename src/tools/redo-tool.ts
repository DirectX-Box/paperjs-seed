import { icon } from '@fortawesome/fontawesome-svg-core';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
//import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { RedoToolbox } from '../toolboxes';

export class RedoTool extends PaperTool {
    public readonly name = 'Refaire';

    public readonly icon = icon(faForwardStep);

    public constructor(private readonly redoToolbox: RedoToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
    }

    public enable(): void {
        super.enable();

        this.redoToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.redoToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
      console.log(event)
    }
}
