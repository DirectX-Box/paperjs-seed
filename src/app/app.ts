import * as paper from 'paper';
import { Plan } from '../plan';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { Messagebox } from '../messagebox';
import { ColorToolbox, SaveToolbox, UndoToolbox, RedoToolbox } from '../toolboxes';
import { FillTool, UndoTool, RedoTool } from '../tools';
import { ActionStack } from '../actions';
import './app.scss';

export class App {
    public static create(host: HTMLElement): App {
        host.classList.add('app');

        return new App(host);
    }

    private constructor(private readonly element: HTMLElement) {
        const messageBox = Messagebox.create(element);
        const actionStack = new ActionStack(messageBox);

        const colorToolbox = new ColorToolbox();
        const undoToolbox = new UndoToolbox(actionStack);
        const redoToolbox = new RedoToolbox(actionStack);

        undoToolbox.bind_redo_toolbox(redoToolbox);
        redoToolbox.bind_undo_toolbox(undoToolbox);

        const toolboxes = ToolboxesContainer.create(element);

        toolboxes.addToolbox(colorToolbox);
        toolboxes.addToolbox(undoToolbox);
        toolboxes.addToolbox(redoToolbox);
        toolboxes.addToolbox(new SaveToolbox());

        const toolbar = Toolbar.create(element);

        toolbar.addTool(new FillTool(colorToolbox));
        toolbar.addTool(new UndoTool(undoToolbox));
        toolbar.addTool(new RedoTool(redoToolbox));

        this.initializePlan();
    }

    private initializePlan(): void {
        const canvas = document.createElement('canvas');
        this.element.appendChild(canvas);

        paper.setup(canvas);

        const plan = new Plan();

        plan.initialize();
    }
}
