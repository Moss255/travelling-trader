import { Texture } from "pixi.js";
import BaseButton from "./base";

class RestartButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/images/restartbutton.png'), 0, 400);

        this.on('pointerdown', () => {
            this.parent.emit('restart');
        })
    }
}

export default RestartButton;