import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";

class Trader extends Sprite {
    public inventory: Inventory;
    constructor(parent: Container<DisplayObject>) {
        let texture = Texture.from('assets/trader.png');

        super(texture);

        this.parent = parent;

        this.anchor.set(0.5);

        this.x = 300;
        this.y = 100;


        this.inventory = new Inventory();
        this.inventory.generateInventory();

    }

    initialise = (playerInventory: Inventory) => {
        this.parent.emit('startTrade', {
            playerItem: playerInventory.pickRandomItem(),
            traderItem: this.inventory.pickRandomItem()
        })
    }
}

export default Trader;