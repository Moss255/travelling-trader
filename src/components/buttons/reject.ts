import { Texture, Sprite } from "pixi.js";

class RejectButton extends Sprite {
    constructor() {
        super(Texture.from('assets/rejectbutton.png'))

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.anchor.set(0.5);

        this.x = window.innerWidth / 2;
        this.y = 560;


        this.on('pointerdown', () => {
            this.parent.emit('reject');
        })
    }
}

export default RejectButton;