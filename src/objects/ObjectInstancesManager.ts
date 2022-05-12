import { DrawAdapterInterface } from "./adapters/DrawAdapterInterface";
import { PlanBuilding } from "./PlanBuilding";
import { ObjectBuilder } from "./ObjectBuilder";
import { ObjectCategory } from "./ObjectCategory";
import { ObjectDefinition } from "./ObjectDefinition";
import { PlanObject } from "./PlanObject";
import { PlanPoint } from "./PlanPoint";

// Gestionnaire des objets du plan.
export class ObjectInstancesManager
{
    // Instance.
    private static instance : ObjectInstancesManager;

    // Générateur d'objets.
    private builder : ObjectBuilder;

    // Adaptateur d'affichage.
    private drawAdapter : DrawAdapterInterface;

    // Liste des bâtiments du plan.
    private building? : PlanBuilding;

    // Liste des objets sur le plan.
    private objects: Map< number, PlanObject >;

    // Nombre d'objets dans le gestionnaire.
    private count: number;

    // Identifiant pour l'ajout de nouveaux objets.
    private currentId: number;

    // Constructeur vide pour le gestionnaire.
    private constructor( drawAdapter : DrawAdapterInterface )
    {
        this.builder = ObjectBuilder.getInstance();
        this.count = 0;
        this.currentId = 1; // Démarre à 1 car 0 n'est pas reconnu dans les Maps.
        this.drawAdapter = drawAdapter;
        this.objects = new Map();
    }

    public static init( drawAdapter: DrawAdapterInterface )
    {
        if( ObjectInstancesManager.instance )
        {
            throw new Error( "ObjectInstancesManager already initialized!" );
        }

        ObjectInstancesManager.instance = new ObjectInstancesManager( drawAdapter );
        return ObjectInstancesManager.getInstance();
    }

    // Retourne l'instance unique du gestionnaire.
    public static getInstance() : ObjectInstancesManager
    {
        if( !ObjectInstancesManager.instance )
        {
            throw new Error( "ObjectInstancesManager not initialized!" );
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
        this.count = this.objects.size;
        return this.getCount();
    }

    // Retourne un objet selon son identifiant.
    public getObject( id: number ) : PlanObject
    {
        let obj = this.objects.get( id );
        if( !obj )
        {
            throw new RangeError( "Object not found." );
        }

        return obj;
    }

    // Désélectionne tout élément sélectionné.
    public clearSelection() : void
    {
        this.drawAdapter.clearSelection();
    }

    public createBuilding( width: number, length: number, wallWidth: number ) : void
    {
        this.building = new PlanBuilding( width, length, wallWidth );
        this.drawAdapter.drawBuilding( this.building );
    }

    // Crée un nouvel objet et l'ajoute au gestionnaire.
    public createObjectFromDefinition( objectDef: ObjectDefinition, position: PlanPoint ) : number
    {
        let obj = this.builder.createObjectFromDefinition( objectDef, position );
        return this.addObject( obj );
    }

    // Ajoute un objet au gestionnaire.
    // Retourne l'identifiant de l'objet créé.
    private addObject( object: PlanObject ) : number
    {
        let id = this.currentId;
        this.objects.set( id, object );
        this.currentId++;
        this.updateCount();
        return id;
    }

    // Retire un objet du gestionnaire.
    // Retourne le nombre d'objets existants après retrait.
    public removeObject( key: number ) : number
    {
        let obj = this.getObject( key );
        this.drawAdapter.deleteObject( obj );
        this.objects.delete( key );
        return this.updateCount();
    }

    // Dessine un objet.
    public drawObject( objectId: number ) : void
    {
        let obj = this.getObject( objectId );
        this.drawAdapter.drawObject( obj );
    }

    // Sélectionne un objet.
    public selectObject( objectId: number ) : void
    {
        let obj = this.objects.get( objectId );
        if( !obj )
            return;

        this.drawAdapter.selectObject( obj );
    }

    // Retourne les définitions du générateur.
    public getDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        return this.builder.getDefinitions();
    }

    // Met à jour les définitions du générateur.
    public readDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        this.builder.updateDefinitions();
        return this.getDefinitions();
    }
}