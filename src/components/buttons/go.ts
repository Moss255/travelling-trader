import { Texture, Sprite } from "pixi.js";

class GoButton extends Sprite {
    constructor() {
        super(Texture.from('assets/gobutton.png'))

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.anchor.set(0.5);

        this.x = window.innerWidth / 2;
        this.y = 350;

        this.on('pointerdown', () => {
            this.parent.emit('nextDay', { action: 'go' });
        })
    }
}

export default GoButton;