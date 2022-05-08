//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import * as paper from 'paper';

export class MuralObjectToolbox extends Toolbox {
    protected readonly title = 'Objet au mur';

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const radiatorButtonElement = document.createElement('button');

        radiatorButtonElement.classList.add('btn');
        radiatorButtonElement.appendChild(document.createTextNode('Radiateur'));

        radiatorButtonElement.addEventListener('click', () => this.drawWall());

        element.appendChild(radiatorButtonElement);

        const extinguisherButtonElement = document.createElement('button');

        extinguisherButtonElement.classList.add('btn');
        extinguisherButtonElement.appendChild(document.createTextNode('Extincteur'));

        extinguisherButtonElement.addEventListener('click', () => this.drawDivider());

        element.appendChild(extinguisherButtonElement);

        return element;
    }

    private drawWall(): void {
        /*const json = paper.project.exportJSON();

        localStorage.setItem('planEditorSave', json);*/
    }

    private drawDivider(): void {
        /*const json = localStorage.getItem('planEditorSave');

        if (json) {
            project.clear();
            project.importJSON(json);
        }*/
    }
}
