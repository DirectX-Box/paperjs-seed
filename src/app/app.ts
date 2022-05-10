import * as paper from 'paper';
import { Plan } from '../plan';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { ColorToolbox, SaveToolbox, BuildObjectToolbox, CeilingObjectToolbox, GroundObjectToolbox, MuralObjectToolbox } from '../toolboxes';
import { FillTool } from '../tools';
import './app.scss';
import { ObjectDefinitionParser } from '../objects/ObjectDefinitionParser';

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

        const toolbar = Toolbar.create(element);

        toolbar.addTool(new FillTool(colorToolbox));
/*        toolbar.addTool(new WallTool(buildObjectToolbox));
        toolbar.addTool(new CeilingObjectTool(ceilingObjectToolbox));
        toolbar.addTool(new GroundObjectTool(groundObjectToolbox));
        toolbar.addTool(new MuralObjectTool(muralObjectToolbox));*/

        ObjectDefinitionParser.parse();

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
