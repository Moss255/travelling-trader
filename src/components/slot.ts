import { Sprite, Texture } from "pixi.js";

class Slot extends Sprite {
    constructor(x: number, y: number) {
        const texture = Texture.from('assets/images/slot.png');
        super(texture);

        this.anchor.set(0.5);

        this.x = x;
        this.y = y;
    }
}

export default Slot;