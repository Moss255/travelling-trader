import { Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";

class Fail extends Container<DisplayObject> {
    //playerItemDisplay: Sprite;
    //traderItemDisplay: Sprite;
    tradingBackground: Sprite;

    constructor(failReason: string) {
        super();

        let tradingBackgroundTexture = Texture.from('assets/tradingwindow.png');

        this.tradingBackground = new Sprite(tradingBackgroundTexture);
        this.tradingBackground.eventMode = 'static';

        this.addChild(this.tradingBackground);

        let text = new Text(failReason);

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