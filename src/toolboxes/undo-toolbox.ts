//import * as paper from 'paper';
import { Toolbox } from '../toolbox';
import { RedoToolbox } from '../toolboxes';
import { ActionStack } from '../actions';
import './action-stack-toolbox.scss';

export class UndoToolbox extends Toolbox {
    protected readonly title = 'Annuler';

    public constructor() {
        super();
    }

    private actionList?: HTMLDivElement;

    private redo_toolbox?: RedoToolbox;

    public bind_redo_toolbox(tb: RedoToolbox) {
      this.redo_toolbox = tb;
    }

    /*private getActionNamesExample(): string[] {
      return [
        "Pose",
        "Delete",
        "Redimension"
      ]
    }*/

    public listActions(): void {
      /*if (this.action_stack == undefined) {
        console.log("action_stack undefined")
        return;// document.createElement("div");
      }*/

      if (this.actionList != undefined) {
        this.actionList.innerHTML = "";
      }

      let action_stack = ActionStack.getInstance();

      //let list: string[] = this.action_stack.getUndoNamesList();
      let list: string[] = action_stack.getUndoNamesList();
      //let list: string[] = this.getActionNamesExample();
      console.log("List:", list)

      for (let name in list) {
        let item = document.createElement("div");
        item.classList.add('action-item');
        let text_node = document.createTextNode(list[name])
        item.addEventListener('click', async (event) => {
          console.log('Clicked on ', name, list[name], "(", event, ")");
          await action_stack.undo(Number(name));
          this.listActions();
          if (this.redo_toolbox) {
            this.redo_toolbox.listActions()
          }
          console.log("Undo: ", action_stack.getUndoNamesList())
        });
        item.appendChild(text_node);

        console.log(list[name], text_node);

        if (this.actionList != undefined) {
          this.actionList.appendChild(item)
        }
      }
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        element.classList.add('undo-toolbox');
        this.actionList = document.createElement('div');
        this.actionList.classList.add('action-list-toolbox');

        console.log("listActions")
        this.listActions()

        element.appendChild(this.actionList);

        return element;
    }
}
