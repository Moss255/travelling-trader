import { FederatedPointerEvent } from "pixi.js";
import Item from "./item";

class Collectable extends Item {
    constructor(private readonly type: number, x: number, y: number) {

        super(type, x, y);

        this.x = x;
        this.y = y;

        this.eventMode = 'static';

        this.cursor = 'pointer';

        this.on('pointerdown', this.pickUp);
    }

    pickUp = (_: FederatedPointerEvent) => {
        this.parent.emit('collect', { itemId: this.type });
    }
}

export default Collectable;