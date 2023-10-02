import { Text } from "pixi.js";
import config from "../../config";
import BaseWindow from "./base";
import RestartButton from "../buttons/restart";

class Final extends BaseWindow {
    constructor(totalScore: number) {
        super();


        const taxDeducation = totalScore * config.KHUMS;

        const taxedTotalScore = totalScore - taxDeducation;

        let text = new Text(`
        Profit: ${totalScore}\n
        Khums: ${taxDeducation}\n
        Profit after Khums: ${taxedTotalScore}\n
        `, config.TEXT_STYLE);

        text.anchor.set(0.5);

        text.x = -20;
        text.y = 20;

        this.addChild(text);

        this.addChild(new RestartButton());

        this.on('restart', () => {
            window.location.reload();
        })
    }
}

export default Final;