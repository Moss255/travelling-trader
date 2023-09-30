import { Application, Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";
import GoButton from './components/buttons/go';
import Item from './components/item';
import Player from './components/player';
import RestButton from "./components/buttons/rest";
import Trading from "./components/windows/trading";
import Trader from "./components/trader";
import Collectable from "./components/collectable";
import Final from "./components/windows/final";
import config from "./config";


interface NextDay {
    action: 'go' | 'rest'
}

interface Trade {
    status: 'pending' | 'accept' | 'reject';
    playerItem: number;
    traderItem: number;
}

type DayEvent = 'trader' | 'item' | 'poor-man' | 'None';

class Game {
    goButton: GoButton;
    restButton: RestButton;
    days: number;
    app: Application;
    player: Player;
    playerItems: Item[];
    dayCounter: Text;
    energyCounter: Text;
    eventText: Text;
    playerInventorySlots: Sprite[];
    windows: Container<DisplayObject>[];
    traders: Trader[];
    collectables: Collectable[];
    constructor(app: Application) {

        this.app = app;

        this.goButton = new GoButton();
        this.restButton = new RestButton();

        this.player = new Player();

        this.traders = [];
        this.windows = [];
        this.collectables = [];

        this.days = config.STARTING_DAY;

        this.dayCounter = new Text(this.days.toString());

        this.dayCounter.x = 200;
        this.dayCounter.y = 0;

        this.energyCounter = new Text(this.player.energy.toString());

        this.eventText = new Text('You start your journey', {
            wordWrap: true,
            wordWrapWidth: 200
        });

        this.eventText.anchor.set(0.5);

        this.eventText.x = 200;
        this.eventText.y = 400;


        this.playerInventorySlots = [0, 0, 0, 0].map((_, index) => {
            let sprite = new Sprite(Texture.from('assets/itemslot.png'));
            sprite.x = 100 * index;
            sprite.y = 300;
            return sprite;
        });

        this.playerItems = this.player.inventory.slots.map((itemType, index) => {
            return new Item(itemType, 100 * index + 15, 300 + 15);
        });

        // Add to stage 

        this.app.stage.addChild(this.goButton);
        this.app.stage.addChild(this.restButton);
        this.app.stage.addChild(this.energyCounter);
        this.app.stage.addChild(this.dayCounter);
        this.app.stage.addChild(...this.playerInventorySlots);
        // this.app.stage.addChild(...this.playerItems);
        this.app.stage.addChild(this.player);
        this.app.stage.addChild(this.eventText);

        // Global Events

        this.app.stage.on('nextDay', this.progressNextDay);
        this.app.stage.on('startTrade', this.startTrade);
        this.app.stage.on('completeTrade', this.completeTrade);
        this.app.stage.on('collect', this.collectItem);

        this.progressNextDay.bind(this);
    }

    progressNextDay = (e: NextDay) => {

        if (e.action === 'rest') {
            this.days += 1;
            this.player.energy += 20;
            this.eventText.text = 'You rested for a day';

            this.dayCounter.text = this.days.toString();
            this.energyCounter.text = this.player.energy.toString();

            if (this.days === config.MAX_DAYS) {
                this.finishGame();
            }

            return;
        }



        this.days += 1;
        this.player.energy -= 20;
        this.eventText.text = 'You continued your journey';

        const event = this.generateDayEvent();

        console.log(`Creating event: ${event}`);

        if (event === 'item') {
            this.eventText.text = 'You found a item on the ground';
            console.log(`Collectables currently around ${this.collectables.length}`)
            this.collectables.push(new Collectable(this.generateItemId(), 200, 200));
            this.app.stage.addChild(...this.collectables);
        } else if (event === 'trader') {
            this.eventText.text = 'You encountered a trader';
            this.createNewTrader();
        }

        this.dayCounter.text = this.days.toString();
        this.energyCounter.text = this.player.energy.toString();

        if (this.days === config.MAX_DAYS) {
            this.finishGame();
        }

    }

    finishGame = () => {
        let total = this.player.inventory.slots.reduce((acc, val) => acc + val)
        console.log(`Item Total ${total}`);
        this.windows.push(new Final(total));
        this.app.stage.addChild(...this.windows);
    }

    startTrade = (e: Trade) => {
        // Waiting 0.5 seconds so player can see trader sprite
        setTimeout(() => {
            this.windows.push(new Trading(e.playerItem, e.traderItem));
            this.app.stage.addChild(...this.windows);
        }, 500);
    }

    completeTrade = (e: Trade) => {
        this.app.stage.removeChild(...this.windows);
        this.app.stage.removeChild(...this.traders);
        switch (e.status) {
            case 'accept':
                this.player.inventory.swapItem(e.playerItem, e.traderItem);
                this.eventText.text = `You sucessfully traded items with a merchant`;
                break;
            case 'reject':
                this.eventText.text = `You rejected the trader's offer`;
        }
    }

    collectItem = (e: any) => {
        this.app.stage.removeChild(...this.collectables);
        this.player.inventory.addItem(e.itemId);
        this.updateInventory();
        this.eventText.text = `You picked up a ${config.ITEMS[e.itemId].Name}`;
    }

    updateInventory = () => {
        this.app.stage.removeChild(...this.playerItems);
        this.playerItems = this.player.inventory.slots.map((itemType, index) => {
            return new Item(itemType, 100 * index + 15, 300 + 15);
        });
        this.app.stage.addChild(...this.playerItems);
    }

    generateDayEvent = (): DayEvent => {
        let event = Math.round(Math.random() * 100 + 1);
        if (event <= config.TRADER_RARITY) {
            return 'trader'
        }

        if (event <= 50) {
            return 'poor-man';
        }

        if (event <= 75) {
            return 'item';
        }
        return 'None';   
    }

    generateItemId = (): number => {
        return Math.floor(Math.random() * config.ITEMS.length);
    }

    createNewTrader = () => {
        let trader = new Trader(this.app.stage);
        trader.initialise(this.player.inventory);
        this.traders.push(trader);
        this.app.stage.addChild(...this.traders);
    }
}

export default Game;