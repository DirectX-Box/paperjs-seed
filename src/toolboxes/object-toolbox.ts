import { ObjectDefinition } from "../objects/ObjectDefinition";
import { Toolbox } from "../toolbox";

export class ObjectToolbox extends Toolbox
{
    // Nom de la boîte à outils.
    protected readonly title: string;

    private currentObj: ObjectDefinition;

    private objects: Array< ObjectDefinition >;

    public constructor( title: string, objects: Array< ObjectDefinition > )
    {
        super();
        this.currentObj = new ObjectDefinition( "", false, 0, [], "" );
        this.objects = objects;
        this.title = title;
    }

    public createElement() : HTMLElement
    {
        const element = super.createElement();

        for( let object of this.objects )
        {
            const objBtn = document.createElement( "button" );
            objBtn.classList.add( "btn" );
            objBtn.appendChild( document.createTextNode( object.getName() ) );
            objBtn.addEventListener( "click", () => this.selectObject( object ) );
            element.appendChild( objBtn );
        }

        return element;
    }

    public getCurrentObject() : ObjectDefinition
    {
        return this.currentObj;
    }

    private selectObject( object: ObjectDefinition ) : void
    {
        this.currentObj = object;
    }
}