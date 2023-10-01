import { Texture } from "pixi.js";
import BaseButton from "./base";

class GoButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/gobutton.png'), window.innerWidth / 2, 350);

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'go' });
        })
    }
}

export default GoButton;