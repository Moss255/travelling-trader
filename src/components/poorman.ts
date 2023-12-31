import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";

class Poorman extends Sprite {
    constructor(parent: Container<DisplayObject>) {
        let texture = Texture.from('assets/images/poorman.png');

        super(texture);

        this.parent = parent;

        this.anchor.set(0.5);

        this.x = 300;
        this.y = 400;

    }

    initialise = (playerInventory: Inventory) => {
        this.parent.emit('startDonation', {
            playerItem: playerInventory.pickRandomItem()
        })
    }
}

export default Poorman;