import { FederatedPointerEvent } from "pixi.js";
import Item from "./item";

class Collectable extends Item {
    constructor(private readonly type: number) {

        super(type, 200, 100);

        this.eventMode = 'static';

        this.cursor = 'pointer';

        this.on('pointerdown', this.pickUp);
    }

    pickUp = (_: FederatedPointerEvent) => {
        this.parent.emit('collect', { itemId: this.type });
    }
}

export default Collectable;