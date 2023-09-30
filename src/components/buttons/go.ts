import { Texture, Sprite } from "pixi.js";

class GoButton extends Sprite {
    constructor() {
        super(Texture.from('assets/gobutton.png'))

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.x = 200;
        this.y = 50;

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'go' });
        })
    }
}

export default GoButton;