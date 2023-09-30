import { Container, DisplayObject } from "pixi.js";

class Inventory {
    slots: number[];
    constructor(private readonly parent: Container<DisplayObject>) {
        // All Inventories have 4 slots
        this.slots = [];
    }

    addItem(item: number) {
        console.log(`Adding item to player inventory ${item}`);
        this.slots.push(item);
        console.log(this.slots);
        this.parent.emit('updateInventory');
    }

    swapItem(prevItem: number, newItem: number) {
        console.log(`Swapping items prevous: ${prevItem}, new: ${newItem}`);
        const previous = this.slots.indexOf(prevItem);
        this.slots[previous] = newItem;
        console.log(this.slots);
        this.parent.emit('updateInventory');
    }

    removeItem(item: number) {
        this.slots = this.slots.filter(x => x === item)
    }

    generateInventory() {
        this.slots = Array(4).fill(Math.round(Math.random() * 10 + 1));
        console.log('Generated Inventory', this.slots);
    }

    pickRandomItem() {
        const slotNumber = Math.floor(Math.random() * this.slots.length);
        return this.slots[slotNumber];
    }
}

export default Inventory;