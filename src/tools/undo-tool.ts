import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
//import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { UndoToolbox } from '../toolboxes';

export class UndoTool extends PaperTool {
    public readonly name = 'Annuler';

    public readonly icon = icon(faBackwardStep);

    public constructor(private readonly undoToolbox: UndoToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
    }

    public enable(): void {
        super.enable();

        this.undoToolbox.listActions();
        this.undoToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.undoToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
      console.log(event)
    }
}
