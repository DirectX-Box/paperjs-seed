import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { PaperTool } from "../toolbar";
import { BuildingToolbox } from "../toolboxes/building-toolbox";
import * as paper from "paper";
import { Plan } from "../plan";

export class BuildingTool extends PaperTool
{
    // Nom de l'outil.
    public readonly name = "Construire un bâtiment";

    // Icône dans la barre d'outils.
    public readonly icon = icon( faHome );

    // Color when drawing the building.
    private readonly DRAWING_COLOR = "#00AA00";

    // Instance du plan.
    private plan : Plan;

    // Rectangle de dessin.
    private drawingRectangle? : paper.Path;

    // Si l'outil est en train de dessiner.
    private isDrawing : boolean;

    // Si la souris a été glissée pendant le dessin.
    private hasDrawn : boolean;

    // Constructeur.
    public constructor( private readonly tb : BuildingToolbox )
    {
        super();

        this.isDrawing = false;
        this.hasDrawn = false;
        this.plan = Plan.getInstance();

        this.paperTool.onMouseDown = this.onMouseDown.bind( this );
        this.paperTool.onMouseDrag = this.onMouseDrag.bind( this );
        this.paperTool.onMouseUp = this.onMouseUp.bind( this );
    }

    // Exécuté lorsque l'outil est activé.
    public enable(): void {
        super.enable();

        this.tb.visible = true;
    }

    // Exécuté lorsque l'outil est désactive.
    public disable(): void {
        super.disable();

        this.tb.visible = false;
    }

    // Exécuté quand le clic gauche de la souris est pressé.
    public onMouseDown(  ): void {

        if( this.plan.canBuildingBeCreated() )
        {
            this.isDrawing = true;
        }

    }

    // Exécuté lorsque la souris est glissée avec le clic enfoncé.
    public onMouseDrag( event: paper.ToolEvent ): void {

        if( this.isDrawing )
        {
            if( this.drawingRectangle )
            {
                this.drawingRectangle.remove();
            }

            this.hasDrawn = true;
            this.drawingRectangle = new paper.Path.Rectangle( event.downPoint, event.point );
            this.drawingRectangle.strokeColor = new paper.Color( this.DRAWING_COLOR );
            this.drawingRectangle.strokeWidth = this.tb.currentValue;
            this.drawingRectangle.dashOffset  = 5;
        }

    }

    // Exécuté quand le bouton de la souris est relâché.
    public onMouseUp( event: paper.ToolEvent ): void {
        if( this.isDrawing && this.hasDrawn )
        {
            this.isDrawing = false;
            this.hasDrawn = false;
            this.drawingRectangle?.remove();

            let length  = event.point.x - event.downPoint.x;
            let width = event.point.y - event.downPoint.y;

            this.plan.createBuilding( width, length, this.tb.currentValue );
        }
    }
}