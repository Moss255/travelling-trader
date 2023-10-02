import { Container, DisplayObject, Sprite, Texture } from "pixi.js";

class BaseWindow extends Container<DisplayObject> {
    background: Sprite;
    constructor() {
        super();

        this.background = new Sprite(Texture.from('assets/images/window.png'));

        this.background.anchor.set(0.5);

        this.x = window.innerWidth / 2;
        this.y = 100;

        this.background.x = 0;
        this.background.y = 0;

        this.addChild(this.background);
    }
}

export default BaseWindow;