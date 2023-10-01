import { Texture, Sprite } from "pixi.js";

class BaseButton extends Sprite {
    constructor(texture: Texture, x: number, y: number) {
        super(texture);

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.anchor.set(0.5);

        this.x = x;
        this.y = y;
    }

    disable() {
        this.eventMode = 'none';
        this.visible = false;
    }

    enable() {
        this.eventMode = 'static';
        this.visible = true;
    }
}

export default BaseButton;