import { Texture } from "pixi.js";
import BaseButton from "./base";

class RestartButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/images/restartbutton.png'), window.innerWidth / 2, 500);

        this.on('pointerdown', () => {
            this.parent.emit('restart');
        })
    }
}

export default RestartButton;