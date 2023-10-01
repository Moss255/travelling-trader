import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
import Item from "../item";
import BaseWindow from "./base";

class Donate extends BaseWindow {
    playerItemDisplay: Item;
    accept: AcceptButton;
    reject: RejectButton;
    playerItem: number;
    constructor(playerItem: number) {
        super();

        console.log(playerItem);

        this.playerItem = playerItem;

        this.accept = new AcceptButton();
        this.reject = new RejectButton();

        this.on('accept', () => {
            this.handleDonationComplete('accept');
        });
        this.on('reject', () => {
            this.handleDonationComplete('reject');
        });

        this.addChild(this.accept);
        this.addChild(this.reject);

        this.playerItemDisplay = new Item(playerItem, 100, 100);

        this.addChild(this.playerItemDisplay);

    }

    handleDonationComplete(status: string) {
        this.parent.emit('completeDonation', {
            status,
            playerItem: this.playerItem
        })
    }
}

export default Donate;