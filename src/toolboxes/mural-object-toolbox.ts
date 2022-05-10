//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import {MuralObject, Extinguisher, Radiator} from "../objects";
//import * as paper from 'paper';

export class MuralObjectToolbox extends Toolbox {
    protected readonly title = 'Objet au mur';
//    public muralObject : InstanceType< typeof MuralObject> | null = null;

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const radiatorButtonElement = document.createElement('button');

        radiatorButtonElement.classList.add('btn');
//        radiatorButtonElement.appendChild(document.createTextNode(Radiator.getNameGroundObject()));

        radiatorButtonElement.addEventListener('click', () => this.drawRadiator());

        element.appendChild(radiatorButtonElement);

        const extinguisherButtonElement = document.createElement('button');

        extinguisherButtonElement.classList.add('btn');
//        extinguisherButtonElement.appendChild(document.createTextNode(Extinguisher.getNameGroundObject()));

        extinguisherButtonElement.addEventListener('click', () => this.drawExtinguisher());

        element.appendChild(extinguisherButtonElement);

        return element;
    }

    private drawRadiator(): void {
//        this.muralObject = new Radiator(0,0,20,30,20);
    }

    private drawExtinguisher(): void {
//        this.muralObject = new Extinguisher(0,0,20,30,20);
    }
}
