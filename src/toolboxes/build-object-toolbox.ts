//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import {BuildObject, Divider, Wall} from '../objects'
//import * as paper from 'paper';

export class BuildObjectToolbox extends Toolbox {
    protected readonly title = 'Construction';

//    public buildObject : InstanceType< typeof BuildObject> | null = null;

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const wallButtonElement = document.createElement('button');

        wallButtonElement.classList.add('btn');
//        wallButtonElement.appendChild(document.createTextNode(Wall.getNameBuildObject()));

        wallButtonElement.addEventListener('click', () => this.drawWall());

        element.appendChild(wallButtonElement);

        const dividerButtonElement = document.createElement('button');

        dividerButtonElement.classList.add('btn');
//        dividerButtonElement.appendChild(document.createTextNode(Divider.getNameBuildObject()));

        dividerButtonElement.addEventListener('click', () => this.drawDivider());

        element.appendChild(dividerButtonElement);

        return element;
    }

    private drawWall(): void {
//        this.buildObject = new Wall(0,0,20,1,25);
    }

    private drawDivider(): void {
//        this.buildObject = new Divider(0,0,20,1,15);
    }
}
