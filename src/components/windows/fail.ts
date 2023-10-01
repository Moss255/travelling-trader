import { Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";
import BaseWindow from "./base";

class Fail extends BaseWindow {
    constructor(failReason: string) {
        super();

        let text = new Text(failReason);

        text.anchor.set(0.5);

        text.x = 200;
        text.y = 200;

        this.addChild(text);

        /* this.playerItemDisplay = new Item(playerItem, 100, 100);
        this.traderItemDisplay = new Item(traderItem, 150, 100);

        this.addChild(this.playerItemDisplay);
        this.addChild(this.traderItemDisplay); */

        this.eventMode = 'static';

        this.on('pointerdown', this.restartGame);
    }

    restartGame() {
        this.parent.emit('restart')
    }
}

export default Fail;