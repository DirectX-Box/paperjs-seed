//import { project } from 'paper';
import { Toolbox } from '../toolbox';
import { CeilingObject, Fan, Lamp } from '../objects'
//import * as paper from 'paper';

export class CeilingObjectToolbox extends Toolbox {
    protected readonly title = 'Objets au plafond';
    public ceilingObject : InstanceType< typeof CeilingObject> | null = null;

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const fanButtonElement = document.createElement('button');

        fanButtonElement.classList.add('btn');
        fanButtonElement.appendChild(document.createTextNode(Fan.getNameGroundObject()));

        fanButtonElement.addEventListener('click', () => this.drawFan());

        element.appendChild(fanButtonElement);

        const lampButtonElement = document.createElement('button');

        lampButtonElement.classList.add('btn');
        lampButtonElement.appendChild(document.createTextNode(Lamp.getNameGroundObject()));

        lampButtonElement.addEventListener('click', () => this.drawLamp());

        element.appendChild(lampButtonElement);

        return element;
    }

    private drawFan(): void {
        this.ceilingObject = new Fan(0,0,20,30,20);
    }

    private drawLamp(): void {
        this.ceilingObject = new Lamp(0,0,20,30,20);
    }
}
