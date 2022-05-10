import * as paper from 'paper';
import { Plan } from '../plan';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { ColorToolbox, SaveToolbox, BuildObjectToolbox, CeilingObjectToolbox, GroundObjectToolbox, MuralObjectToolbox } from '../toolboxes';
import { FillTool } from '../tools';
//import { WallTool } from '../tools/wall-tool.ts';
import './app.scss';
//import {CeilingObjectTool} from "../tools/ceiling-object-tool";
//import {GroundObjectTool} from "../tools/ground-object-tool";
//import {MuralObjectTool} from "../tools/mural-object-tool";
import { ObjectDefinitionParser } from '../objects/ObjectDefinitionParser';

export class App {
    public static create(host: HTMLElement): App {
        host.classList.add('app');

        return new App(host);
    }

    private constructor(private readonly element: HTMLElement) {
        const colorToolbox = new ColorToolbox();
        const buildObjectToolbox = new BuildObjectToolbox();
        const ceilingObjectToolbox = new CeilingObjectToolbox();
        const groundObjectToolbox = new GroundObjectToolbox();
        const muralObjectToolbox = new MuralObjectToolbox();

        const toolboxes = ToolboxesContainer.create(element);

        toolboxes.addToolbox(colorToolbox);
        toolboxes.addToolbox(new SaveToolbox());
        toolboxes.addToolbox(buildObjectToolbox);
        toolboxes.addToolbox(ceilingObjectToolbox);
        toolboxes.addToolbox(groundObjectToolbox);
        toolboxes.addToolbox(muralObjectToolbox);

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
