import './messagebox.scss';

export class Messagebox {
    private _element: HTMLElement;

    public static create(host: HTMLElement): Messagebox {
        const messageboxElement = document.createElement('div');

        messageboxElement.classList.add('messagebox');

        host.appendChild(messageboxElement);

        return new Messagebox(messageboxElement);
    }

    public constructor(private _elem: HTMLElement) {
      this._element = _elem;
      this.hideBox;
    }

    private hideBox() {
      this._element.style.display = 'none';
    }

    private showBox() {
      this._element.style.display = 'flex';
    }

    public showMessage(text: string): void {
        this.showBox()
        this._element.innerText = text;

        clearTimeout()
        setTimeout((i) => {i.hideBox()}, 3000, this);
    }
}
