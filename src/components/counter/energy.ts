import { Sprite, Texture } from "pixi.js";

class EnergyCounter extends Sprite {
    private textures: Texture[];
    constructor(private value: number) {
        let textures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => { return Texture.from(`assets/images/energybar/${value}.png`)});
        super(textures[0]);

        this.textures = textures;

        this.anchor.set(0.5);

        this.x = window.innerWidth / 2 - 40;
        this.y = 30;

        this.visible = true;
    }

    update(newValue: number) {
        this.value = newValue;
        this.texture = this.textures[this.value];
    }
}

export default EnergyCounter;