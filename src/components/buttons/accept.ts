import { Texture } from "pixi.js";
import BaseButton from "./base";

class AcceptButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/images/acceptbutton.png'), window.innerWidth / 2, 500);

        this.on('pointerdown', () => {
            this.parent.emit('accept');
        })
    }
}

export default AcceptButton;