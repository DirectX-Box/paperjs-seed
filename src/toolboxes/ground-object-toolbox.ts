//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import * as paper from 'paper';

export class GroundObjectToolbox extends Toolbox {
    protected readonly title = 'Objets au sol';

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const standButtonElement = document.createElement('button');

        standButtonElement.classList.add('btn');
        standButtonElement.appendChild(document.createTextNode('Stand'));

        standButtonElement.addEventListener('click', () => this.draw());

        element.appendChild(standButtonElement);

        const cashRegisterButtonElement = document.createElement('button');

        cashRegisterButtonElement.classList.add('btn');
        cashRegisterButtonElement.appendChild(document.createTextNode('Caisse'));

        cashRegisterButtonElement.addEventListener('click', () => this.draw());

        element.appendChild(cashRegisterButtonElement);

        const shelfButtonElement = document.createElement('button');

        shelfButtonElement.classList.add('btn');
        shelfButtonElement.appendChild(document.createTextNode('Etagère'));

        shelfButtonElement.addEventListener('click', () => this.draw());

        element.appendChild(shelfButtonElement);

        this.visible = true;

        return element;
    }

    private draw(): void {
        /*const json = paper.project.exportJSON();

        localStorage.setItem('planEditorSave', json);*/
    }
}
