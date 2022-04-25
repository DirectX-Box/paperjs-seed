import { Action } from '../actions';
import { AddFurnitureAction, MoveFurnitureAction } from '../actions';
import { NullAction } from './null-action';
import { Messagebox } from '../messagebox';

export class ActionStack {

    public readonly HISTORY_LIMIT: number = 10;
    private undoStack: Action[] = [];
    private currentAction!: Action;
    private redoStack: Action[] = [];
    private messagebox: Messagebox;

    public constructor(private msgbox: Messagebox) {
      this.currentAction = new NullAction();
      this.exampleStacks();
      this.messagebox = msgbox;
    }

    private exampleStacks() {
      this.exampleUndoStack();
      this.exampleRedoStack();
    }

    private exampleUndoStack() {
      this.undoStack = [
        new AddFurnitureAction(1, 1.2, 3.2),
        new MoveFurnitureAction(1, 1.2, 3.2, 2.3, 2.1),
      ]
    }

    private exampleRedoStack() {
      this.redoStack = [
        new AddFurnitureAction(2, -1.2, 1.4),
        new MoveFurnitureAction(2, 1.2, 3.2, 2.3, 2.1),
        new MoveFurnitureAction(1, 0.2, -3.8, -0.3, 2.1),
      ]
    }

    public pushNewAction(action: Action) {
      this.pushInUndoStack(action);
      this.currentAction = action;
      this.redoStack = [];
    }

    public redoCurrentAction() {
      if (this.undoStack.length > 0) {
        this.pushInRedoStack(this.currentAction);
        this.currentAction = this.undoStack[0];
        this.undoStack.pop();
      }
    }

    public pushInUndoStack(action: Action) {
      console.log("pushInUndoStack: ", action.getName())
      if (action.getName() != "Null") {
        this.undoStack.unshift(action.reverse())
      }
      if (this.undoStack.length > this.HISTORY_LIMIT) {
        this.undoStack.pop()
      }
      console.log("pushInUndoStack, undoStack: ", this.undoStack)
    }

    public pushInRedoStack(action: Action) {
      console.log("pushInRedoStack: ", action.getName())
      if (action.getName() != "Null") {
        this.redoStack.unshift(action)
      }
      if (this.redoStack.length > this.HISTORY_LIMIT) {
        this.redoStack.pop()
      }
      console.log("pushInRedoStack, redoStack: ", this.redoStack)
    }

    public getUndoNamesList(): string[] {
      return this.undoStack.map(x => x.getName())
    }

    public getRedoNamesList(): string[] {
      return this.redoStack.map(x => x.getName())
    }

    public undo(iter: Number = 1): void {
      let count: Number =
        (iter > this.HISTORY_LIMIT)
          ? this.HISTORY_LIMIT
          : iter;
      if (count < 0) return;

      let msg = "";

      for (let i = 0; i <= count && this.undoStack.length > 0; i++) {
        if (this.currentAction && this.undoStack) {
          this.pushInRedoStack(this.currentAction);
          let shift_stack = this.undoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            this.currentAction = shift_stack;
            console.log("[", i, "] undo: ", shift_stack)
            msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      this.messagebox.showMessage(msg);

    }

    public redo(iter: Number = 1): void {
      let count: Number =
        (iter > this.HISTORY_LIMIT)
          ? this.HISTORY_LIMIT
          : iter;
      if (count < 0) return;

            let msg = "";

      for (let i = 0; i <= count && this.redoStack.length > 0; i++) {
        if (this.currentAction && this.redoStack) {
          this.pushInUndoStack(this.currentAction);
          let shift_stack = this.redoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            this.currentAction = shift_stack;
            console.log("[", i, "] redo: ", shift_stack)
            msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      this.messagebox.showMessage(msg);

    }

}
