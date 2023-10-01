import { Text } from "pixi.js";
import Item from "../item";
import AcceptButton from "../buttons/accept";
import RejectButton from "../buttons/reject";
import BaseWindow from "./base";
import Slot from "../slot";
import config from "../../config";

class Trading extends BaseWindow {
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

        const playerText = new Text(`${config.ITEMS[this.playerItem].Name} - ${config.ITEMS[this.playerItem].Money}`, config.TEXT_STYLE);

        playerText.x = 240;
        playerText.y = 60;

        this.addChild(playerText);
        this.addChild(new Slot(240, 60));
        this.addChild(new Item(traderItem, 240, 60));

        const traderText = new Text(`${config.ITEMS[this.traderItem].Name} - ${config.ITEMS[this.traderItem].Money}`, config.TEXT_STYLE);

        traderText.x = 90;
        traderText.y = 135;

        this.addChild(traderText);
        this.addChild(new Slot(90, 135));
        this.addChild(new Item(playerItem, 90, 135));
        
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