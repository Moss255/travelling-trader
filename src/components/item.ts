import { Sprite, Texture } from "pixi.js"

class Item extends Sprite {
    constructor(itemType: number, x:number, y: number) {
        const texture = Item.getItemTextureFromType(itemType);

        super(texture);

        this.eventMode = 'static'

    }

    static getItemTextureFromType(_: number) {
        return Texture.from('assets/typescript.svg');
    }
}

export default Item;