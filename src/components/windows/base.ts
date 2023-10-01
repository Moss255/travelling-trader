import { Container, DisplayObject, Sprite, Texture } from "pixi.js";

class BaseWindow extends Container<DisplayObject> {
    background: Sprite;
    constructor() {
        super();

        this.background = new Sprite(Texture.from('assets/tradingwindow.png'));

        this.background.anchor.set(0.5);

        this.background.x = window.innerWidth / 2;
        this.background.y = 100;

        this.addChild(this.background);
    }
}

export default BaseWindow;