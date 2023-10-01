import Item from "../item";
import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
import BaseWindow from "./base";
// import Item from "../item";

class Trading extends BaseWindow {
    playerItemDisplay: Item;
    traderItemDisplay: Item;
    accept: AcceptButton;
    reject: RejectButton;
    playerItem: number;
    traderItem: number;
    constructor(playerItem: number, traderItem: number) {
        super();


        console.log(`Player Item: ${playerItem}`);
        console.log(`Trader Item: ${traderItem}`);

        this.playerItem = playerItem;
        this.traderItem = traderItem;

        this.accept = new AcceptButton();
        this.reject = new RejectButton();

        this.on('accept', () => {
            this.handleTradeComplete('accept');
        });
        this.on('reject', () => {
            this.handleTradeComplete('reject');
        });

        this.addChild(this.accept);
        this.addChild(this.reject);

        this.traderItemDisplay = new Item(traderItem, 240, 60);
        this.playerItemDisplay = new Item(playerItem, 90, 135);

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