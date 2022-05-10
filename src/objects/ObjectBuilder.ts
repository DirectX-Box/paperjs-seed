//import { ObjectDefinition } from "./ObjectDefinition";

export class ObjectBuilder
{
    private static instance: ObjectBuilder;

//    private definitions: Array< ObjectDefinition >;

    private constructor()
    {
//        this.definitions = [];
    }

    public getInstance() : ObjectBuilder
    {
        if( !ObjectBuilder.instance )
        {
            ObjectBuilder.instance = new ObjectBuilder();
        }

        return ObjectBuilder.instance;
    }
}