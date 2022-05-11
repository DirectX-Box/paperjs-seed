//import * as paper from 'paper';
import { Toolbox } from '../toolbox';
import { UndoToolbox } from '../toolboxes';
import { ActionStack } from '../actions';
import './action-stack-toolbox.scss';

export class RedoToolbox extends Toolbox {
    protected readonly title = 'Refaire';

    public constructor() {
        super();
    }

    private actionList?: HTMLDivElement;

    private undo_toolbox?: UndoToolbox;

    public bind_undo_toolbox(tb: UndoToolbox) {
      this.undo_toolbox = tb;
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

      //let list: string[] = this.action_stack.getRedoNamesList();
      let list: string[] = action_stack.getRedoNamesList();
      //let list: string[] = this.getActionNamesExample();
      console.log("List:", list)

      for (let name in list) {
        let item = document.createElement("div");
        item.classList.add('action-item');
        let text_node = document.createTextNode(list[name])
        item.addEventListener('click', async (event) => {
          console.log('Clicked on ', name, list[name], "(", event, ")");
          await action_stack.redo(Number(name));
          this.listActions();
          if (this.undo_toolbox) {
            this.undo_toolbox.listActions()
          }
          console.log("Redo: ", action_stack.getRedoNamesList())
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

        element.classList.add('redo-toolbox');
        this.actionList = document.createElement('div');
        this.actionList.classList.add('action-list-toolbox');

        console.log("listActions")
        this.listActions()

        element.appendChild(this.actionList);

        return element;
    }
}
