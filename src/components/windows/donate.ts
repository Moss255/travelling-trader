import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
// import Item from "../item";

class Donate extends Container<DisplayObject> {
    //playerItemDisplay: Sprite;
    //traderItemDisplay: Sprite;
    tradingBackground: Sprite;
    constructor(playerItem: number) {
        super();

        let tradingBackgroundTexture = Texture.from('assets/tradingwindow.png');

        this.tradingBackground = new Sprite(tradingBackgroundTexture);

        console.log(playerItem);

        this.tradingBackground.eventMode = 'static';

        this.tradingBackground.on('pointerdown', () => {
            this.parent.emit('completeDonation', {
                status: 'accept',
                playerItem
            })
        })

        this.addChild(this.tradingBackground);

        /* this.playerItemDisplay = new Item(playerItem, 100, 100);
        this.traderItemDisplay = new Item(traderItem, 150, 100);

        this.addChild(this.playerItemDisplay);
        this.addChild(this.traderItemDisplay); */
    }
}

export default Donate;