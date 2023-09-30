import { Application, Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";
import GoButton from './components/buttons/go';
import Item from './components/item';
import Player from './components/player';
import RestButton from "./components/buttons/rest";
import Trading from "./components/windows/trading";
import Trader from "./components/trader";
import Collectable from "./components/collectable";


interface NextDay {
    action: 'go' | 'rest'
}

interface Trade {
    status: 'pending' | 'accept' | 'reject';
    playerItem: number;
    traderItem: number;
}

type DayEvent = 'trader' | 'item';

class Game {
    goButton: GoButton;
    restButton: RestButton;
    days: number;
    app: Application;
    player: Player;
    playerItems: Item[];
    dayCounter: Text;
    energyCounter: Text;
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

        this.days = 1;

        this.dayCounter = new Text(this.days.toString());

        this.dayCounter.x = 200;
        this.dayCounter.y = 0;

        this.energyCounter = new Text(this.player.energy.toString());


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

        // Global Events

        this.app.stage.on('nextDay', this.progressNextDay);
        this.app.stage.on('startTrade', this.startTrade);
        this.app.stage.on('completeTrade', this.completeTrade);
        this.app.stage.on('collect', this.collectItem);

        this.progressNextDay.bind(this);
    }

    progressNextDay = (e: NextDay) => {
        switch (e.action) {
            case 'go':
                this.days += 1;
                this.player.energy -= 20;
                break;
            case 'rest':
                this.days += 1;
                this.player.energy += 20;
                break;
        }

        const event = this.generateDayEvent();

        if (event === 'item') {
            this.collectables.push(new Collectable(this.generateItemId(), 200, 200));
            this.app.stage.addChild(...this.collectables);
        }




        this.dayCounter.text = this.days.toString();
        this.energyCounter.text = this.player.energy.toString();
       
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
        switch (e.status) {
            case 'accept':
                this.player.inventory.swapItem(e.playerItem, e.traderItem);
                break;
        }
    }

    collectItem = (e: any) => {
        this.app.stage.removeChild(...this.collectables);
        this.player.inventory.addItem(e.itemId);
    }

    generateDayEvent = (): DayEvent => {
        let event = Math.round(Math.random() * 100 + 1);
        if (event <= 25) {
            return 'trader' 
        }
        return 'item';
    }

    generateItemId = (): number => {
        return 1;
    }
    
    createNewTrader = () => {
        let trader = new Trader(this.app.stage);
        trader.initialise(this.player.inventory);
        this.traders.push(trader);
        this.app.stage.addChild(...this.traders);
    }
}

export default Game;