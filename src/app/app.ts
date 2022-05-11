import * as paper from 'paper';
import { Plan } from '../plan';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { Messagebox } from '../messagebox';
import { SaveToolbox, UndoToolbox, RedoToolbox } from '../toolboxes';
import { UndoTool, RedoTool } from '../tools';
import { ActionStack } from '../actions';
import './app.scss';

export class App {
    public static create(host: HTMLElement): App {
        host.classList.add('app');

        return new App(host);
    }

    private constructor(private readonly element: HTMLElement) {

        const toolbar   = Toolbar.create( element );
        const toolboxes = ToolboxesContainer.create( element );
        

        const messageBox = Messagebox.create(element);
        const actionStack = new ActionStack(messageBox);
        const undoToolbox = new UndoToolbox(actionStack);
        const redoToolbox = new RedoToolbox(actionStack);

        undoToolbox.bind_redo_toolbox(redoToolbox);
        redoToolbox.bind_undo_toolbox(undoToolbox);
        toolboxes.addToolbox(new SaveToolbox());
        toolboxes.addToolbox(undoToolbox);
        toolboxes.addToolbox(redoToolbox);

        toolbar.addTool(new UndoTool(undoToolbox));
        toolbar.addTool(new RedoTool(redoToolbox));

        this.initializePlan( toolboxes, toolbar );
    }

    private initializePlan( toolboxes : ToolboxesContainer, toolbar: Toolbar ): void {
        const canvas = document.createElement('canvas');
        this.element.appendChild(canvas);

        paper.setup(canvas);

        const plan = Plan.getInstance();

        plan.initialize( toolboxes, toolbar );
    }
}
