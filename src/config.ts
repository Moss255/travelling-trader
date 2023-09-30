interface Config {
    MAX_DAYS: number;
    STARTING_DAY: number;
    TRADER_RARITY: number;
    POOR_MAN_RARITY: number;
    ITEM_RARITY: number;
    KHUMS: number;
    ITEMS: ConfigItem[];
    TIME_PERSON_SHOWN: number;
}

interface ConfigItem {
    Name: string;
    Description: string;
    Rarity: string;
    Money: number;
    Path: string;
}


const config: Config = {
    MAX_DAYS: 30,
    STARTING_DAY: 1,
    TRADER_RARITY: 25,
    POOR_MAN_RARITY: 50,
    ITEM_RARITY: 75,
    KHUMS: 0.2,
    TIME_PERSON_SHOWN: 1000,
    ITEMS: [
        {
            Name : "Gold Bar",
            Description : "NA",
            Rarity : "Common",
            Money : 100,
            Path: 'assets/goldbar.png'
        },
        {
            Name : "Gold Ring",
            Description : "NA",
            Rarity : "Common",
            Money : 100,
            Path: 'assets/goldring.png'
        },
        {
            Name : "Water",
            Description : "+5 to energy",
            Rarity : "Common",
            Money : 5,
            Path: 'assets/water.png'
        },
        {
            Name : "Diamond",
            Description : "NA",
            Rarity: "Rare",
            Money : 200,
            Path: 'assets/diamond.png'
        },
        {
            Name: 'Necklace',
            Description: 'NA',
            Rarity: 'Rare',
            Money: 150,
            Path: 'assets/necklace.png'
        },
        {
            Name: 'Rice',
            Description: 'NA',
            Rarity: 'Common',
            Money: 50,
            Path: 'assets/rice.png'
        },
        {
            Name: 'Almond',
            Description: 'NA',
            Rarity: 'Common',
            Money: 45,
            Path: 'assets/almonds.png'
        }
    ],
}

export default config;