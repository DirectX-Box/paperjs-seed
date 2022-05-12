import { Toolbox } from '../toolbox';
import './color-toolbox.scss';

export class BuildingToolbox extends Toolbox {

    private static DEFAULT_WIDTH : number = 20;

    protected readonly title = "Bâtiment";

    private textBox? : HTMLInputElement;

    public createElement(): HTMLElement {
        const element = super.createElement();

        const textElement = document.createElement( "div" );

        this.textBox =  document.createElement( "input" );
        this.textBox.type = "number";
        this.textBox.value = BuildingToolbox.DEFAULT_WIDTH.toString();

        // Ceci était supposé permettre de redessiner le bâtiment plusieurs
        // fois avant de le confirmer définitivement, mais l'accès
        // à la barre d'outils après sa population dans Plan est plus
        // compliqué que prévu donc cette fonctionnalité est repoussée.
        /*
        const doneBtn = document.createElement( "button" );
        doneBtn.classList.add( "btn" );
        doneBtn.appendChild( document.createTextNode( "Confirmer bâtiment" ) );
        doneBtn.addEventListener( "click", () => this.confirm );
        */

        element.appendChild( this.textBox );
        element.appendChild( textElement );
        // element.appendChild( doneBtn );

        return element;
    }

    public get currentValue(): number {
        if ( !this.textBox ) {
            throw new Error( `${this.createElement.name} was not called!` );
        }

        let res = parseFloat( this.textBox.value ) ?? BuildingToolbox.DEFAULT_WIDTH;

        return res;
    }

    /*
    private confirm()
    {
        // TODO.
    }
    */
}
