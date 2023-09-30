import { Texture, Sprite } from "pixi.js";

class RestButton extends Sprite {
    constructor() {
        super(Texture.from('assets/restbutton.png'))

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.x = 0;
        this.y = 50;

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'rest' });
        })
    }
}

export default RestButton;