import { Sprite, Texture } from "pixi.js";
import Inventory from "./inventory";
import config from "../config";

class Player extends Sprite {
    public inventory: Inventory;
    public energy: number;
    public kindness: number;
    constructor() {

        let texture = Texture.from('assets/player.png');

        super(texture);

        this.x = 100;
        this.y = 50;

        this.energy = 100;
        this.kindness = 10;

        this.inventory = new Inventory();
    }

    getItemThresholds(): string {
        if (this.kindness > config.PLAYER_VERY_RARE_THRESHOLD) {
            return 'very-rare';
        }

        if (this.kindness > config.PLAYER_RARE_THRESHOLD) {
            return 'rare';
        }

        return 'common';
        
    }
}

export default Player;