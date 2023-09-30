import { Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";
import config from "../../config";

class Final extends Container<DisplayObject> {
    //playerItemDisplay: Sprite;
    //traderItemDisplay: Sprite;
    tradingBackground: Sprite;

    constructor(totalScore: number) {
        super();

        let tradingBackgroundTexture = Texture.from('assets/tradingwindow.png');

        this.tradingBackground = new Sprite(tradingBackgroundTexture);
        this.tradingBackground.eventMode = 'static';

        this.addChild(this.tradingBackground);

        totalScore -= totalScore * config.KHUMS;

        let text = new Text('You have won' + totalScore);

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

export default Final;