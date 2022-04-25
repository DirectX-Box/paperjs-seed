import { Action } from '../actions';

export class NullAction extends Action {
  protected readonly name = "Null";

  public constructor() {
    super();
  }

  public reverse(): NullAction {
    return new NullAction();
  }

}
