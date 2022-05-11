import './messagebox.scss';

export class Messagebox {
    // Instance unique de la boîte de message.
    private static instance : Messagebox;
    private _element?: HTMLElement;

    public static create(host: HTMLElement): Messagebox {
        const messageboxElement = document.createElement('div');

        messageboxElement.classList.add('messagebox');

        host.appendChild(messageboxElement);

        return new Messagebox(messageboxElement);
    }

    // Retourne l'instance de la Messagebox.
    public static getInstance() : Messagebox
    {
        return Messagebox.instance;
    }

    public constructor(_elem?: HTMLElement) {
      if (typeof _elem !== 'undefined')
        this._element = _elem;
      this.hideBox;
    }

    private hideBox() {
      if (this._element!)
      this._element.style.display = 'none';
    }

    private showBox() {
      if (this._element!)
      this._element.style.display = 'flex';
    }

    public showMessage(text: string): void {
        this.showBox()
        if (this._element!)
        this._element.innerText = text;

        clearTimeout()
        setTimeout((i) => {i.hideBox()}, 3000, this);
    }
}
