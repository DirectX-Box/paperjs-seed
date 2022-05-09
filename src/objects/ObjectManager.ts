import { DrawAdapterInterface } from "./adapters/DrawAdapterInterface";
import { PlanObject } from "./PlanObject";
import { PlanPoint } from "./PlanPoint";
import { PlanShape } from "./PlanShape";

// Gestionnaire des objets du plan.
export class ObjectManager
{
    // Système de dessin.
    private drawAdapter: DrawAdapterInterface;

    // Liste des objets sur le plan.
    private objects: Array< PlanObject >;

    // Nombre d'objets dans le gestionnaire.
    private count: number;

    // Constructeur vide pour le gestionnaire.
    constructor( drawAdapter: DrawAdapterInterface )
    {
        this.count = 0;
        this.drawAdapter = drawAdapter;
        this.objects = [];
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
        for( var i = 0; i < this.count; i++ )
        {
            if( this.objects[i] == object )
            {
                this.removeObjectByIndex( i );
            }
        }
    }
}