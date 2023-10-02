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
import Poorman from "./components/poorman";
import Donate from "./components/windows/donate";
import DaysCounter from "./components/counter/days";
import EnergyCounter from "./components/counter/energy";
import Slot from "./components/slot";


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
    dayCounter: DaysCounter;
    energyCounter: EnergyCounter;
    eventText: Text;
    playerInventorySlots: Sprite[];
    windows: Container<DisplayObject>[];
    traders: Trader[];
    poorman: Poorman[];
    collectables: Collectable[];
    constructor(app: Application) {

        this.app = app;

        this.goButton = new GoButton();
        this.restButton = new RestButton();

        this.player = new Player();

        this.traders = [];
        this.windows = [];
        this.collectables = [];
        this.poorman = [];

        this.days = config.STARTING_DAY;

        this.dayCounter = new DaysCounter(this.days);

        this.energyCounter = new EnergyCounter(this.player.energy);

        this.eventText = new Text('You start your journey', config.TEXT_STYLE_EVENT);

        this.eventText.anchor.set(0.5);

        this.eventText.x = window.innerWidth / 2;
        this.eventText.y = 180;


        this.playerInventorySlots = [0, 0, 0, 0].map((_, index) => {
            return new Slot(70 * index + 85, 120);
        });

        this.playerItems = [];



        // Add to stage 

        const backgroundTexture = Texture.from('assets/images/background.png');

        this.app.stage.addChild(new Sprite(backgroundTexture));
        this.app.stage.addChild(this.goButton);
        this.app.stage.addChild(this.restButton);
        this.app.stage.addChild(this.energyCounter);
        this.app.stage.addChild(this.dayCounter);
        this.app.stage.addChild(...this.playerInventorySlots);
        this.app.stage.addChild(this.player);
        this.app.stage.addChild(this.eventText);

        

        

        // Global Events

        this.app.stage.on('nextDay', this.progressNextDay);
        this.app.stage.on('startTrade', this.startTrade);
        this.app.stage.on('completeTrade', this.completeTrade);
        this.app.stage.on('startDonation', this.startDonation);
        this.app.stage.on('completeDonation', this.completeDonation);
        this.app.stage.on('collect', this.collectItem);

        this.progressNextDay.bind(this);
    }

    progressNextDay = (e: NextDay) => {

        this.goButton.disable();
        this.restButton.disable();

        console.log(`Days Passed ${this.days}`);

        if (this.days >= config.MAX_DAYS) {
            this.finishGame();
            return;
        }

        if (e.action === 'go' && this.player.energy <= config.ENERGY_MIN) {
            this.eventText.text = 'You must rest, you have no energy';
            this.updateInventory();
            return;
        } 

        if (e.action === 'rest' && this.player.energy >= config.ENERGY_MAX) {
            this.eventText.text = 'You have full energy. You should continue.'
            this.updateInventory();
            return;
        }

        if (e.action === 'rest') {
            this.days += 1;
            this.player.energy += config.ENERGY_INCREMENT;
            this.eventText.text = 'You rested for a day';

            this.updateCounters();

            this.updateInventory();

            return;
        }



        this.days += 1;
        this.player.energy -= config.ENERGY_INCREMENT;
        this.eventText.text = 'You continued your journey';

        this.updateCounters();

        const event = this.generateDayEvent();

        console.log(`Creating event: ${event}`);

        switch (event) {
            case 'item':
                this.createNewItem();
                return;
            case 'poor-man':
                this.createNewPoorman();
                return;
            case 'trader':
                this.createNewTrader();
                return;
            default:
                this.updateInventory();
                return;
        }
    }

    startDonation = (e: Trade) => {
        console.log(`Starting donation with item ${e.playerItem}`);
        setTimeout(() => {
            this.windows.push(new Donate(e.playerItem));
            this.app.stage.addChild(...this.windows);
        }, config.TIME_PERSON_SHOWN);
    }

    completeDonation = (e: Trade) => {
        console.log(`Completing donation ${e.status}`);
        this.app.stage.removeChild(...this.windows);
        this.app.stage.removeChild(...this.poorman);
        switch (e.status) {
            case 'accept':
                this.player.inventory.removeItem(e.playerItem);
                this.player.kindness += config.ITEMS[e.playerItem].Money;
                this.eventText.text = `May God accept your donation.`;
                break;
            case 'reject':
                this.eventText.text = `You were unable to donate your items.`;
                break;
        }

        console.log(`Player Kindness ${this.player.kindness}`);
        this.updateInventory();
    }

    finishGame = () => {
        let total = this.player.inventory.slots.reduce((acc, val) => acc + config.ITEMS[val].Money, 0)
        console.log(`Item Total ${total}`);
        this.windows.push(new Final(total));
        this.app.stage.addChild(...this.windows);
    }

    startTrade = (e: Trade) => {
        // Waiting 0.5 seconds so player can see trader sprite
        setTimeout(() => {
            this.windows.push(new Trading(e.playerItem, e.traderItem));
            this.app.stage.addChild(...this.windows);
        }, config.TIME_PERSON_SHOWN);
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
                break;
        }

        this.updateInventory();
    }

    collectItem = (e: any) => {
        this.app.stage.removeChild(...this.collectables);
        this.collectables.pop();
        this.player.inventory.addItem(e.itemId);
        this.updateInventory();
        this.eventText.text = `You picked up ${config.ITEMS[e.itemId].Name}`;
    }

    updateInventory = () => {
        this.app.stage.removeChild(...this.playerItems);
        this.playerItems = this.player.inventory.slots.map((itemType, index) => {
            return new Item(itemType, 70 * index + 85, 120);
        });
        if (this.playerItems.length > 0) {
            this.app.stage.addChild(...this.playerItems);
        }
        this.goButton.enable();
        this.restButton.enable();
    }

    updateCounters = () => {
        this.dayCounter.update(this.days);
        this.energyCounter.update(this.player.energy);
    }

    generateDayEvent = (): DayEvent => {
        // First action should be an item.
        if (this.player.inventory.slots.length <= 0) {
            return 'item';
        }

        let event = Math.round(Math.random() * 100 + 1);
        if (event <= config.TRADER_RARITY) {
            return 'trader'
        }

        

        if (event <= config.POOR_MAN_RARITY) {
            return 'poor-man';
        }

        if (event <= config.ITEM_RARITY && this.player.inventory.slots.length < 4) {
            return 'item';
        }


        return 'None';   
    }

    generateItemId = (): number => {
        const rarity = this.player.getItemThresholds();
        const items = config.ITEMS.filter(x => x.Rarity === rarity);
        return items[Math.floor(Math.random() * items.length)].Index;
    }

    createNewTrader = () => {
        this.eventText.text = 'You encountered a trader';
        let trader = new Trader(this.app.stage);
        trader.initialise(this.player.inventory);
        this.traders.push(trader);
        this.app.stage.addChild(...this.traders);
    }

    createNewItem = () => {
        this.eventText.text = 'You found a item on the ground.';
        console.log(`Collectables currently around ${this.collectables.length}`)
        this.collectables.push(new Collectable(this.generateItemId()));
        this.app.stage.addChild(...this.collectables);
    }

    createNewPoorman = () => {
        this.eventText.text = 'You encountered someone in need.';
        let poorman = new Poorman(this.app.stage);
        poorman.initialise(this.player.inventory);
        this.poorman.push(poorman);
        this.app.stage.addChild(...this.poorman);
    }
}

export default Game;