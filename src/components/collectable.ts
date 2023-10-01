import { FederatedPointerEvent } from "pixi.js";
import Item from "./item";

class Collectable extends Item {
    constructor(private readonly type: number) {

        super(type, 300, 400);

        this.eventMode = 'static';

        this.cursor = 'pointer';

        this.on('pointerdown', this.pickUp);
    }

    pickUp = (_: FederatedPointerEvent) => {
        this.parent.emit('collect', { itemId: this.type });
    }
}

export default Collectable;