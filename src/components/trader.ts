import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";

class Trader extends Sprite {
    public inventory: Inventory;
    constructor(parent: Container<DisplayObject>) {
        let texture = Texture.from('assets/trader.png');

        super(texture);

        this.parent = parent;

        this.x = 200;
        this.y = 200;


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