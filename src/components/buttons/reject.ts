import { Texture } from "pixi.js";
import BaseButton from "./base";

class RejectButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/rejectbutton.png'), window.innerWidth / 2, 570);

        this.on('pointerdown', () => {
            this.parent.emit('reject');
        })
    }
}

export default RejectButton;