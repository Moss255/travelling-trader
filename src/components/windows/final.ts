import { Sprite, Text, Texture } from "pixi.js";
import config from "../../config";
import BaseWindow from "./base";

class Final extends BaseWindow {
    constructor(totalScore: number) {
        super();

        totalScore -= totalScore * config.KHUMS;

        let text = new Text('You have won' + totalScore);

        text.anchor.set(0.5);

        text.x = 200;
        text.y = 200;

        this.addChild(text);

        this.eventMode = 'static';

        this.on('pointerdown', this.restartGame);
    }

    restartGame() {
        this.parent.emit('restart')
    }
}

export default Final;