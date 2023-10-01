import { Text } from "pixi.js";

class DaysCounter extends Text {
    constructor(private value: number) {
        super(value.toString());

        this.x = 200;
        this.y = 0;

        this.visible = false;
    }

    update(newValue: number) {
        this.value = newValue;
        this.text = this.value.toString();
    }
}

export default DaysCounter;