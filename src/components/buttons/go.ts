import { Texture } from "pixi.js";
import BaseButton from "./base";

class GoButton extends BaseButton {
    constructor() {
        super(Texture.from('assets/images/gobutton.png'), window.innerWidth / 2, 500);

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'go' });
        })
    }
}

export default GoButton;