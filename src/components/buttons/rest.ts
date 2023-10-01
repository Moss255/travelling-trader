import { Texture } from "pixi.js";
import BaseButton from "./base";

class RestButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/restbutton.png'), window.innerWidth / 2, 570);

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'rest' });
        })
    }
}

export default RestButton;