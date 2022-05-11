import { Action } from '../actions';
import { AddFurnitureAction, MoveFurnitureAction } from '../actions';
import { NullAction } from './null-action';
import { Messagebox } from '../messagebox';

export class ActionStack {

    // Instance unique.
    private static instance : ActionStack;
    public readonly HISTORY_LIMIT: number = 10;
    private undoStack: Action[] = [];
    private currentAction!: Action;
    private redoStack: Action[] = [];

    public constructor() {
      this.currentAction = new NullAction();
    //  this.exampleStacks();
    //  this.messagebox = msgbox;
    }

    // Retourne l'instance de l'ActionStack.
    public static getInstance() : ActionStack
    {
        if( !ActionStack.instance )
            ActionStack.instance = new ActionStack();
        return ActionStack.instance;
    }

    public pushNewAction(action: Action) : void {
      this.pushInUndoStack(action);
      this.currentAction = action;
      this.redoStack = [];
    }

    public redoCurrentAction() : void {
      if (this.undoStack.length > 0) {
        this.pushInRedoStack(this.currentAction);
        this.currentAction = this.undoStack[0];
        this.undoStack.pop();
      }
    }

    public pushInUndoStack(action: Action) : void {
      //console.log("pushInUndoStack: ", action.getName())
      if (action.getName() != "Null") {
        this.undoStack.unshift(action.reverse())
      }
      if (this.undoStack.length > this.HISTORY_LIMIT) {
        this.undoStack.pop()
      }
      //console.log("pushInUndoStack, undoStack: ", this.undoStack)
    }

    public pushInRedoStack(action: Action) {
      //console.log("pushInRedoStack: ", action.getName())
      if (action.getName() != "Null") {
        this.redoStack.unshift(action)
      }
      if (this.redoStack.length > this.HISTORY_LIMIT) {
        this.redoStack.pop()
      }
      //console.log("pushInRedoStack, redoStack: ", this.redoStack)
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
          let shift_stack = this.undoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            shift_stack.execute();
            this.pushInRedoStack(this.currentAction);
            this.currentAction = shift_stack;
            console.log("[", i, "] undo: ", shift_stack)
            msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      //Messagebox.getInstance().showMessage(msg);

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
          let shift_stack = this.redoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            shift_stack.execute();
            this.pushInUndoStack(this.currentAction);
            this.currentAction = shift_stack;
            console.log("[", i, "] redo: ", shift_stack)
            msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      //Messagebox.getInstance().showMessage(msg);

    }

}
