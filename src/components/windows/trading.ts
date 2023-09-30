import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import Item from "../item";
import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
// import Item from "../item";

class Trading extends Container<DisplayObject> {
    playerItemDisplay: Item;
    traderItemDisplay: Item;
    accept: AcceptButton;
    reject: RejectButton;
    tradingBackground: Sprite;
    playerItem: number;
    traderItem: number;
    constructor(playerItem: number, traderItem: number) {
        super();

        let tradingBackgroundTexture = Texture.from('assets/tradingwindow.png');

        this.tradingBackground = new Sprite(tradingBackgroundTexture);

        console.log(`Player Item: ${playerItem}`);
        console.log(`Trader Item: ${traderItem}`);

        this.playerItem = playerItem;
        this.traderItem = traderItem;

        this.tradingBackground.eventMode = 'static';

        this.accept = new AcceptButton();
        this.reject = new RejectButton();

        this.on('accept', () => {
            this.handleTradeComplete('accept');
        });
        this.on('reject', () => {
            this.handleTradeComplete('reject');
        });

        this.addChild(this.tradingBackground);
        this.addChild(this.accept);
        this.addChild(this.reject);

        this.playerItemDisplay = new Item(playerItem, 100, 100);
        this.traderItemDisplay = new Item(traderItem, 150, 100);

        this.addChild(this.playerItemDisplay);
        this.addChild(this.traderItemDisplay);
    }

    handleTradeComplete(status: string) {
        this.parent.emit('completeTrade', {
            status,
            playerItem: this.playerItem,
            traderItem: this.traderItem
        })
    }
}

export default Trading;