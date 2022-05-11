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
        const colorToolbox = new ColorToolbox();

        const toolboxes = ToolboxesContainer.create(element);

        toolboxes.addToolbox(colorToolbox);
        toolboxes.addToolbox(new SaveToolbox());


        const messageBox = Messagebox.create(element);
        const actionStack = new ActionStack();
        const undoToolbox = new UndoToolbox();
        const redoToolbox = new RedoToolbox();
        undoToolbox.bind_redo_toolbox(redoToolbox);
        redoToolbox.bind_undo_toolbox(undoToolbox);
        toolboxes.addToolbox(undoToolbox);
        toolboxes.addToolbox(redoToolbox);

        const toolbar = Toolbar.create(element);

        toolbar.addTool(new FillTool(colorToolbox));
        toolbar.addTool(new UndoTool(undoToolbox));
        toolbar.addTool(new RedoTool(redoToolbox));
/*        toolbar.addTool(new WallTool(buildObjectToolbox));
        toolbar.addTool(new CeilingObjectTool(ceilingObjectToolbox));
        toolbar.addTool(new GroundObjectTool(groundObjectToolbox));
        toolbar.addTool(new MuralObjectTool(muralObjectToolbox));*/

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
