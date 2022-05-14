import './messagebox.scss';

export class Messagebox {
    // Instance unique de la boîte de message.
    private static instance : Messagebox;
    private _element?: HTMLElement;

    // Fonction publique pour instancier une Messagebox détachée
    public static create(host: HTMLElement): Messagebox {
        const messageboxElement = document.createElement('div');

        messageboxElement.classList.add('messagebox');

        host.appendChild(messageboxElement);

        return new Messagebox(messageboxElement);
    }

    public constructor(_elem?: HTMLElement) {
      if (typeof _elem !== 'undefined')
        this._element = _elem;
      this.hideBox;
    }

    //************************** GETTER **************************************//
    // Retourne l'instance de la Messagebox.
    public static getInstance() : Messagebox
    {
      return Messagebox.instance;
    }

    // Retourne vrai si la Messagebox est attachée à un élément hôte
    public isAttached() : boolean
    {
      return (this._element !== undefined);
    }

    //************************** SETTER **************************************//
    // Helper: Cache la Messagebox.
    private hideBox() {
      if (this._element!)
        this._element.style.display = 'none';
    }

    // Helper: Montre la Messagebox à l'écran.
    private showBox() {
      if (this._element!)
        this._element.style.display = 'flex';
    }

    // Rattache la boîte à un élément hôte du DOM
    public attachTo(_elem?: HTMLElement) {
      if (typeof _elem !== 'undefined')
        this._element = _elem;
    }

    //************************** PROCEDURE ***********************************//
    public showMessage(text: string): void {
      if (text != "") {
        this.showBox()
        if (this._element!)
        this._element.innerText = text;

        clearTimeout()
        setTimeout((i) => {i.hideBox()}, 3000, this);
      }
    }
}
