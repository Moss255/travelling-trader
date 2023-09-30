import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
// import Item from "../item";

class Donate extends Container<DisplayObject> {
    //playerItemDisplay: Sprite;
    //traderItemDisplay: Sprite;
    tradingBackground: Sprite;
    accept: AcceptButton;
    reject: RejectButton;
    playerItem: number;
    constructor(playerItem: number) {
        super();

        let tradingBackgroundTexture = Texture.from('assets/tradingwindow.png');

        this.tradingBackground = new Sprite(tradingBackgroundTexture);

        console.log(playerItem);

        this.playerItem = playerItem;

        this.tradingBackground.eventMode = 'static';

        this.tradingBackground.on('pointerdown', () => {
            
        })

        this.accept = new AcceptButton();
        this.reject = new RejectButton();

        this.on('accept', () => {
            this.handleDonationComplete('accept');
        });
        this.on('reject', () => {
            this.handleDonationComplete('reject');
        });

        this.addChild(this.tradingBackground);
        this.addChild(this.accept);
        this.addChild(this.reject);

        /* this.playerItemDisplay = new Item(playerItem, 100, 100);

        this.addChild(this.playerItemDisplay);
        
        */
    }

    handleDonationComplete(status: string) {
        this.parent.emit('completeDonation', {
            status,
            playerItem: this.playerItem
        })
    }
}

export default Donate;