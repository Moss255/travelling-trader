import { Texture, Sprite } from "pixi.js";

class AcceptButton extends Sprite {
    constructor() {
        super(Texture.from('assets/acceptbutton.png'))

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.anchor.set(0.5);

        this.x = window.innerWidth / 2;
        this.y = 490;

        this.on('pointerdown', () => {
            this.parent.emit('accept');
        })
    }
}

export default AcceptButton;