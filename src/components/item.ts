import { Sprite, Texture } from "pixi.js"
import config from "../config";

class Item extends Sprite {
    constructor(type: number,  x:number, y: number) {
        const texture = Item.getItemTextureFromType(type);

        super(texture);

        this.x = x;
        this.y = y;

    }

    static getItemTextureFromType(type: number) {
        const path = config.ITEMS[type].Path
        return Texture.from(path);
    }
}

export default Item;