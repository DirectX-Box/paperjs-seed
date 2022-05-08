//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import * as paper from 'paper';

export class CeilingObjectToolbox extends Toolbox {
    protected readonly title = 'Objets au plafond';

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const fanButtonElement = document.createElement('button');

        fanButtonElement.classList.add('btn');
        fanButtonElement.appendChild(document.createTextNode('Ventilateur'));

        fanButtonElement.addEventListener('click', () => this.draw());

        element.appendChild(fanButtonElement);

        const lampButtonElement = document.createElement('button');

        lampButtonElement.classList.add('btn');
        lampButtonElement.appendChild(document.createTextNode('Lampe'));

        lampButtonElement.addEventListener('click', () => this.draw());

        element.appendChild(lampButtonElement);

        return element;
    }

    private draw(): void {
        /*const json = paper.project.exportJSON();

        localStorage.setItem('planEditorSave', json);*/
    }
}
