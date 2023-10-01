import { Text } from "pixi.js";
import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
import Item from "../item";
import Slot from "../slot";
import BaseWindow from "./base";
import config from "../../config";

class Donate extends BaseWindow {
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

        this.addChild(new Slot(100, 100));
        this.addChild(new Item(playerItem, 100, 100));

        const text = new Text('Would you be able to donate this item', config.TEXT_STYLE);

        text.x = 100;
        text.y = 150;

        this.addChild(text);

    }

    handleDonationComplete(status: string) {
        this.parent.emit('completeDonation', {
            status,
            playerItem: this.playerItem
        })
    }
}

export default Donate;