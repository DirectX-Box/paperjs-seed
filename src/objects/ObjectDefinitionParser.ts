import definitions from "./objects.json";
import { ObjectCategory } from "./ObjectCategory";
import { PlanColor } from "./PlanColor";
import { ObjectDefinition } from "./ObjectDefinition";
import { PlanPoint } from "./PlanPoint";
//import { ObjectDefinition } from "./ObjectDefinition";

// Analyseur de définitions.
export class ObjectDefinitionParser
{
    public static readonly SCHEMA_VERSION = 1;

    // Analyse le fichier de définitions passé en paramètre.
    public static parse() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        if( definitions.SchemaVersion != ObjectDefinitionParser.SCHEMA_VERSION )
        {
            throw new RangeError( "Cannot read this schema. Expected " + ObjectDefinitionParser.SCHEMA_VERSION + ", got " + definitions.SchemaVersion );
        }

        let res = new Map<ObjectCategory, Array< ObjectDefinition > >();
        let dupObjects = new Map< string, Map< string, number > >();

        for( let jsonCategory of definitions.categories )
        {
            let category = null;
            let strObjMap = dupObjects.get( jsonCategory.name );

            if( strObjMap != null )
            {
                for( let objCategory of res.keys() )
                {
                    if( objCategory.getName() == jsonCategory.name )
                    {
                        category = objCategory;
                        break;
                    }
                }
            }
            else
            {
                strObjMap = new Map< string, number >();
            }

            if( category == null )
            {
                category = new ObjectCategory( jsonCategory.name );
            }

            let objects = res.get( category ) ?? new Array< ObjectDefinition >();

            for( let object of jsonCategory.objects )
            {
                // On ignore les objets doublons dans une même catégorie.
                if( !object.name || strObjMap.get( object.name ) == 1 )
                {
                    continue;
                }
                let color = new PlanColor();
                color.setValuesFromArray( object.color );

                let radius = object.radius ?? 0;
                let points = Array< PlanPoint >();
                if( object.shape )
                {
                    for( let point of object.shape )
                    {
                        points.push( new PlanPoint( point[0], point[1] ) );
                    }
                }

                objects.push( new ObjectDefinition( object.name, object.permanent ?? false, radius, points, object.type ?? "", color ) );
                strObjMap.set( object.name, 1 );
            }

            res.set( category, objects );
        }

        return res;
    }
}