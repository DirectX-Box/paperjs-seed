import definitions from "./objects.json";
import { ObjectCategory } from "./ObjectCategory";
import { PlanColor } from "./PlanColor";
import { ObjectDefinition } from "./ObjectDefinition";
//import { ObjectDefinition } from "./ObjectDefinition";

// Analyseur de définitions.
export class ObjectDefinitionParser
{
    public static readonly SCHEMA_VERSION = 1;

    // Analyse le fichier de définitions passé en paramètre.
    public static parse() : Map< ObjectCategory, Array< ObjectDefinition >
    {
        if( definitions.SchemaVersion != ObjectDefinitionParser.SCHEMA_VERSION )
        {
            throw new RangeError( "Cannot read this schema. Expected " + ObjectDefinitionParser.SCHEMA_VERSION + ", got " + definitions.SchemaVersion );
        }

        let res = new Map<ObjectCategory, ObjectDefinition >();

        for( let jsonCategory of definitions.categories )
        {
            let category;

            // Prise en charge des doublons.
            for( let key of res.keys() )
            {
                if( key.getName() == jsonCategory.name )
                {
                    category = key;
                }
            }
            category = category ?? new ObjectCategory( jsonCategory.name );
            let objects = new Array< ObjectDefinition >();
            for( let object of jsonCategory.objects )
            {
                let color = new PlanColor();
                color.setValuesFromArray( object.color );
                objects.push( new ObjectDefinition( object.name, category, color ) );
            }
            
        }
    }
}