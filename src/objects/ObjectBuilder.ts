import { ObjectCategory } from "./ObjectCategory";
import { ObjectDefinition } from "./ObjectDefinition";
import { ObjectDefinitionParser } from "./ObjectDefinitionParser";

export class ObjectBuilder
{
    private static instance: ObjectBuilder;

    private definitions: Map< ObjectCategory, Array< ObjectDefinition > >;

    private constructor()
    {
        this.definitions = new Map();
    }

    public getInstance() : ObjectBuilder
    {
        if( !ObjectBuilder.instance )
        {
            ObjectBuilder.instance = new ObjectBuilder();
        }

        return ObjectBuilder.instance;
    }

    public updateDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        this.definitions = ObjectDefinitionParser.parse();
        return this.getDefinitions();
    }

    public getDefinitions() : Map< ObjectCategory, Array< ObjectDefinition > >
    {
        return this.definitions;
    }
}