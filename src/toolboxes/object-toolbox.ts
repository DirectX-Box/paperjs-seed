import { ObjectDefinition } from "../objects/ObjectDefinition";
import { ObjectInstancesManager } from "../objects/ObjectInstancesManager";
import { Toolbox } from "../toolbox";

export class ObjectToolbox extends Toolbox
{
    // Nom de la boîte à outils.
    protected readonly title: string;

    private objects: Array< ObjectDefinition >;

    public constructor( title: string, objects: Array< ObjectDefinition > )
    {
        super();
        this.title = title;
        this.objects = objects;
    }

    public createElement() : HTMLElement
    {
        const element = super.createElement();

        for( let object of this.objects )
        {
            const objBtn = document.createElement( "button" );
            objBtn.classList.add( "btn" );
            objBtn.appendChild( document.createTextNode( object.getName() ) );
            objBtn.addEventListener( "click", () => this.createObject( object ) );
            element.appendChild( objBtn );
        }

        return element;
    }

    private createObject( object: ObjectDefinition ) : void
    {
        
    }
}