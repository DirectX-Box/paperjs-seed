import { ObjectCategory } from "./ObjectCategory";
import { ObjectDefinition } from "./ObjectDefinition";
import { ObjectDefinitionParser } from "./ObjectDefinitionParser";
import { PlanObject } from "./PlanObject";
import { PlanPoint } from "./PlanPoint";
import { PlanShape } from "./PlanShape";

// Stocke les définitions et permet la génération d'objets.
export class ObjectBuilder
{

    // L'unique instance de cette classe.
    private static instance: ObjectBuilder;

    // La map stockant les définitions par catégorie.
    private definitions: Map< ObjectCategory, Array< ObjectDefinition > >;

    // Constructeur (privé).
    private constructor()
    {
        this.definitions = new Map();
    }

    // Retourne l'unique instance de cette classe.
    public static getInstance() : ObjectBuilder
    {
        if( !ObjectBuilder.instance )
        {
            ObjectBuilder.instance = new ObjectBuilder();
        }

        return ObjectBuilder.instance;
    }

    // Met à jour les définitions depuis le fichier JSON.
    public updateDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        this.definitions = ObjectDefinitionParser.parse();
        return this.getDefinitions();
    }

    // Retourne les définitions que la classe détient.
    public getDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        return this.definitions;
    }

    // Retourne toutes les définitions dans un tableau simple.
    public getDefinitionsArray() : Array< ObjectDefinition >
    {
        let res = new Array< ObjectDefinition >();
        for( let defs of this.definitions.values() )
        {
            res.concat( defs );
        }

        return res;
    }

    public getDefinitionsForCategory( category: ObjectCategory ) : Array< ObjectDefinition >
    {
        let res = this.definitions.get( category );
        if( !res )
            throw new Error( "Category " + category.getName() + " does not exist." );
        return res;
    }

    // Crée une instance PlanObject depuis une définition.
    public createObjectFromDefinition( objectDef: ObjectDefinition, position: PlanPoint ) : PlanObject
    {
        let shape = new PlanShape();
        shape.setRadius( objectDef.getRadius() );
        shape.setType( objectDef.getType() );
        for( let point of objectDef.getShape() )
        {
            shape.addPoint( point );
        }
        return new PlanObject( objectDef.getName(), objectDef.getColor(), position, shape, true );
    }
}