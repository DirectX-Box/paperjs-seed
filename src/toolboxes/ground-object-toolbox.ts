//import { project } from 'paper';
import { Toolbox } from '../toolbox';
import {GroundObject, CashRegister, Stand, Shelf } from '../objects'
//import * as paper from 'paper';

export class GroundObjectToolbox extends Toolbox {
    protected readonly title = 'Objets au sol';
    public groundObject : InstanceType< typeof GroundObject> | null = null;

    public constructor() {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const standButtonElement = document.createElement('button');

        standButtonElement.classList.add('btn');
        standButtonElement.appendChild(document.createTextNode(Stand.getNameGroundObject()));

        standButtonElement.addEventListener('click', () => this.drawStand());

        element.appendChild(standButtonElement);

        const cashRegisterButtonElement = document.createElement('button');

        cashRegisterButtonElement.classList.add('btn');
        cashRegisterButtonElement.appendChild(document.createTextNode(CashRegister.getNameGroundObject()));

        cashRegisterButtonElement.addEventListener('click', () => this.drawCashRegister());

        element.appendChild(cashRegisterButtonElement);

        const shelfButtonElement = document.createElement('button');

        shelfButtonElement.classList.add('btn');
        shelfButtonElement.appendChild(document.createTextNode(Shelf.getNameGroundObject()));

        shelfButtonElement.addEventListener('click', () => this.drawShelf());

        element.appendChild(shelfButtonElement);

        return element;
    }

    private drawCashRegister(): void {
        this.groundObject = new CashRegister(0,0,20,30,20);
    }

    private drawStand(): void {
        this.groundObject = new Stand(0,0,20,40,25);
    }

    private drawShelf(): void {
        this.groundObject = new Shelf(0,0,20,30,10);
    }
}
