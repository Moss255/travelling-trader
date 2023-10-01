import { Text } from "pixi.js";
import config from "../../config";
import BaseWindow from "./base";
import RestartButton from "../buttons/restart";

class Final extends BaseWindow {
    constructor(totalScore: number) {
        super();

        totalScore -= totalScore * config.KHUMS;

        let text = new Text('You have won' + totalScore);

        text.anchor.set(0.5);

        text.x = 200;
        text.y = 200;

        this.addChild(text);

        this.addChild(new RestartButton());
    }
}

export default Final;