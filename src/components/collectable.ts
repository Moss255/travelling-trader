import { FederatedPointerEvent, Sprite, Texture } from "pixi.js";

class Collectable extends Sprite {
    constructor(private readonly type: number, x: number, y: number) {

        const texture = Collectable.getItemTextureFromType(type);
        super(texture);

        this.x = x;
        this.y = y;

        this.eventMode = 'static';

        this.cursor = 'pointer';

        this.on('pointerdown', this.pickUp);
    }

    pickUp = (_: FederatedPointerEvent) => {
        this.parent.emit('collect', { itemId: this.type });
    }

    static getItemTextureFromType(_: number) {
        return Texture.from('assets/goldring.png');
    }
}

export default Collectable;