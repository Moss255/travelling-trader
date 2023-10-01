import { Text } from "pixi.js";

class EnergyCounter extends Text {
    constructor(private value: number) {
        super(value.toString());

        this.x = 0;
        this.y = 0;

        this.visible = true;
    }

    update(newValue: number) {
        this.value = newValue;
        this.text = this.value.toString();
    }
}

export default EnergyCounter;