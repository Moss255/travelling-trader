import config from "../config";

class Inventory {
    slots: number[];
    constructor() {
        // All Inventories have 4 slots
        this.slots = [];
    }

    addItem(item: number) {
        console.log(`Adding item to player inventory ${item}`);
        this.slots.push(item);
        console.log(this.slots);
    }

    swapItem(prevItem: number, newItem: number) {
        console.log(`Swapping items prevous: ${prevItem}, new: ${newItem}`);
        const previous = this.slots.indexOf(prevItem);
        this.slots[previous] = newItem;
        console.log(this.slots);
    }

    removeItem(item: number) {
        console.log(`Removing Item ${item} from inventory`);
        const itemPosition = this.slots.indexOf(item);
        console.log(`Items position in Array ${itemPosition}`);
        const newSlots = this.slots.filter((slot, index) => index !== itemPosition && slot);
        console.log(newSlots);
        this.slots = newSlots;
    }

    generateInventory() {
        this.slots = Array(4).fill(Math.round(Math.random() * config.ITEMS.length - 1));
        console.log('Generated Inventory', this.slots);
    }

    pickRandomItem() {
        const slotNumber = Math.floor(Math.random() * this.slots.length);
        return this.slots[slotNumber];
    }
}

export default Inventory;