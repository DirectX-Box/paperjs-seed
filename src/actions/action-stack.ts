import { Action } from '../actions';
import { AddFurnitureAction, MoveFurnitureAction } from '../actions';
import { NullAction } from './null-action';
import { Messagebox } from '../messagebox';

// Pile d'actions à double sens (défaire/refaire)
export class ActionStack {

    // Instance unique.
    private static instance : ActionStack;

    // Nombre limite d'actions tolérés avant de défausser les actions stockées
    public readonly HISTORY_LIMIT: number = 10;

    // Pile d'actions Défaire
    private undoStack: Action[] = [];
    // Action dernièrement effectuée : remise dans l'une des deux piles
    private currentAction!: Action;
    // Pile d'actions Refaire
    private redoStack: Action[] = [];

    public constructor() {
      this.currentAction = new NullAction();
    //  this.exampleStacks();
    }

    // Retourne l'instance de l'ActionStack.
    public static getInstance() : ActionStack
    {
        if( !ActionStack.instance )
            ActionStack.instance = new ActionStack();
        return ActionStack.instance;
    }

    //************************** GETTER **************************************//
    // Retourne la liste des actions de la pile Défaire
    public getUndoNamesList(): string[] {
      return this.undoStack.map(x => x.getName());
    }

    // Retourne la liste des actions de la pile Refaire
    public getRedoNamesList(): string[] {
      return this.redoStack.map(x => x.getName())
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

    // Ajoute une action à la pile Défaire, et tronque au maximum toléré
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

    // Ajoute une action à la pile Refaire, et tronque au maximum toléré
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

    // Défait les 'iter' premières actions listées dans la liste undoStack
    public undo(iter: Number = 1): void {
      let count: Number =
        (iter > this.HISTORY_LIMIT)
          ? this.HISTORY_LIMIT
          : iter;
      if (count < 0) return;

      let msg = "";
      let messageBox = Messagebox.getInstance()
      let isMessageBoxAvailable: boolean = messageBox! && messageBox.isAttached();

      for (let i = 0; i <= count && this.undoStack.length > 0; i++) {
        if (this.currentAction && this.undoStack) {
          let shift_stack = this.undoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            shift_stack.execute();
            this.pushInRedoStack(this.currentAction);
            this.currentAction = shift_stack;
            console.log("[", i, "] undo: ", shift_stack)
            if (isMessageBoxAvailable)
              msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      if (isMessageBoxAvailable)
        messageBox.showMessage(msg);
    }

    // Refait les 'iter' premières actions listées dans la liste redoStack
    public redo(iter: Number = 1): void {
      let count: Number =
        (iter > this.HISTORY_LIMIT)
          ? this.HISTORY_LIMIT
          : iter;
      if (count < 0) return;

      let msg = "";
      let messageBox = Messagebox.getInstance()
      let isMessageBoxAvailable: boolean = messageBox! && messageBox.isAttached();

      for (let i = 0; i <= count && this.redoStack.length > 0; i++) {
        if (this.currentAction && this.redoStack) {
          let shift_stack = this.redoStack.shift();
          if (shift_stack && shift_stack.getName() != "Null") {
            shift_stack.execute();
            this.pushInUndoStack(this.currentAction);
            this.currentAction = shift_stack;
            console.log("[", i, "] redo: ", shift_stack)
            if (isMessageBoxAvailable)
              msg += "Undone : " + shift_stack.getName() + "\n";
          }
        }
      }
      if (isMessageBoxAvailable)
        messageBox.showMessage(msg);

    }

}
