import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";

class Poorman extends Sprite {
    constructor(parent: Container<DisplayObject>) {
        let texture = Texture.from('assets/poorman.png');

        super(texture);

        this.parent = parent;

        this.x = 200;
        this.y = 100;

    }

    initialise = (playerInventory: Inventory) => {
        this.parent.emit('startDonation', {
            playerItem: playerInventory.pickRandomItem()
        })
    }
}

export default Poorman;