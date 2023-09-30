import { Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";

class Player extends Sprite {
    public inventory: Inventory;
    public energy: number;
    constructor() {

        let texture = Texture.from('assets/player.png');

        super(texture);

        this.x = 100;
        this.y = 100;

        this.energy = 100;

        this.inventory = new Inventory(this.parent);
    }
}

export default Player;