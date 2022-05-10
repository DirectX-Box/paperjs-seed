import { DrawAdapterInterface } from "./adapters/DrawAdapterInterface";
import { ObjectDefinition } from "./ObjectDefinition";
import { PlanObject } from "./PlanObject";
import { PlanPoint } from "./PlanPoint";

// Gestionnaire des objets du plan.
export class ObjectInstancesManager
{
    // Instance.
    private static instance : ObjectInstancesManager;

    // Système de dessin.
    private drawAdapter: DrawAdapterInterface;

    // Liste des objets sur le plan.
    private objects: Array< PlanObject >;

    // Nombre d'objets dans le gestionnaire.
    private count: number;

    // Constructeur vide pour le gestionnaire.
    private constructor( drawAdapter: DrawAdapterInterface )
    {
        this.count = 0;
        this.drawAdapter = drawAdapter;
        this.objects = [];
    }

    public static init( adapter: DrawAdapterInterface ) : ObjectInstancesManager
    {
        if( !ObjectInstancesManager.instance )
        {
            ObjectInstancesManager.instance = new ObjectInstancesManager( adapter );
            return ObjectInstancesManager.getInstance();
        }
        else
        {
            throw new Error( "ObjectInstanceManagers already initialized!" );
        }
    }

    public static getInstance() : ObjectInstancesManager
    {
        if( !ObjectInstancesManager.instance )
        {
            throw new Error( "ObjectInstancesManager not initialized." );
        }

        return ObjectInstancesManager.instance;
    }

    // Retourne le nombre d'objets dans le gestionnaire.
    public getCount() : number
    {
        return this.count;
    }

    // Met à jour le nombre d'objets dans le gestionnaire.
    public updateCount() : number
    {
        this.count = this.objects.length;
        return this.getCount();
    }

    public createObjectFromDefinition( objectDef: ObjectDefinition, position: PlanPoint ) : PlanObject
    {
        let obj = new PlanObject( objectDef.getName(), position, true )
        this.addObject( obj );
        return obj;
    }

    // Demande un dessin au système correspondant.
    public drawObject( object: PlanObject ) : void
    {
        this.drawAdapter.drawObject( object );
    }

    // Ajoute un objet au gestionnaire.
    public addObject( object: PlanObject ) : number
    {
        this.objects.push( object );
        return this.updateCount();
    }

    // Retire un objet du gestionnaire selon son indice.
    public removeObjectByIndex( index: number ) : number
    {
        this.objects.splice( 1, index );
        return this.updateCount();
    }

    // Retire un objet du gestionnaire.
    public removeObject( object : PlanObject ) : void
    {
        for( let i = 0; i < this.count; i++ )
        {
            if( this.objects[i] == object )
            {
                this.removeObjectByIndex( i );
            }
        }
    }
}