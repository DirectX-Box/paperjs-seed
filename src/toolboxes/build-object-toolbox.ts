//import { project } from 'paper';
import { Toolbox } from '../toolbox';
//import * as paper from 'paper';

export class BuildObjectToolbox extends Toolbox {
    protected readonly title = 'Construction';

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const wallButtonElement = document.createElement('button');

        wallButtonElement.classList.add('btn');
        wallButtonElement.appendChild(document.createTextNode('Mur'));

        wallButtonElement.addEventListener('click', () => this.drawWall());

        element.appendChild(wallButtonElement);

        const dividerButtonElement = document.createElement('button');

        dividerButtonElement.classList.add('btn');
        dividerButtonElement.appendChild(document.createTextNode('Cloison'));

        dividerButtonElement.addEventListener('click', () => this.drawDivider());

        element.appendChild(dividerButtonElement);

        this.visible = true;

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
