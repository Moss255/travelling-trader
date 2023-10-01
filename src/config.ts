import { TextStyle } from "pixi.js";

interface Config {
    MAX_DAYS: number;
    STARTING_DAY: number;
    ENERGY_MIN: number;
    ENERGY_MAX: number;
    ENERGY_INCREMENT: number;
    ENERGY_INITIAL: number;
    KINDNESS_INITIAL: number;
    TRADER_RARITY: number;
    POOR_MAN_RARITY: number;
    ITEM_RARITY: number;
    KHUMS: number;
    ITEMS: ConfigItem[];
    TIME_PERSON_SHOWN: number;
    PLAYER_COMMON_THRESHOLD: number;
    PLAYER_RARE_THRESHOLD: number;
    PLAYER_VERY_RARE_THRESHOLD: number;
    TEXT_STYLE: Partial<TextStyle> | TextStyle;
}

interface ConfigItem {
    Index: number;
    Name: string;
    Description: string;
    Rarity: string;
    Money: number;
    Path: string;
}


const config: Config = {
    TEXT_STYLE: {
        fontSize: 18,
        wordWrap: true,
        wordWrapWidth: 200,
        fontFamily: 'rabiul'
    },
    MAX_DAYS: 30,
    STARTING_DAY: 1,
    ENERGY_MAX: 10,
    ENERGY_MIN: 0,
    ENERGY_INCREMENT: 1,
    ENERGY_INITIAL: 10,
    KINDNESS_INITIAL: 10,
    TRADER_RARITY: 25,
    POOR_MAN_RARITY: 50,
    ITEM_RARITY: 75,
    KHUMS: 0.2,
    TIME_PERSON_SHOWN: 1000,
    PLAYER_COMMON_THRESHOLD: 100,
    PLAYER_RARE_THRESHOLD: 200,
    PLAYER_VERY_RARE_THRESHOLD: 300,
    ITEMS: [
        {
            Index: 0,
            Name : "Gold Bar",
            Description : "NA",
            Rarity : "rare",
            Money : 150,
            Path: 'assets/images/goldbar.png'
        },
        {
            Index: 1,
            Name : "Gold Ring",
            Description : "NA",
            Rarity : "rare",
            Money : 100,
            Path: 'assets/images/goldring.png'
        },
        {
            Index: 2,
            Name : "Water",
            Description : "+5 to energy",
            Rarity : "common",
            Money : 40,
            Path: 'assets/images/water.png'
        },
        {
            Index: 3,
            Name : "Diamond",
            Description : "NA",
            Rarity: "very-rare",
            Money : 200,
            Path: 'assets/images/diamond.png'
        },
        {
            Index: 4,
            Name: 'Necklace',
            Description: 'NA',
            Rarity: 'very-rare',
            Money: 300,
            Path: 'assets/images/necklace.png'
        },
        {
            Index: 5,
            Name: 'Rice',
            Description: 'NA',
            Rarity: 'common',
            Money: 50,
            Path: 'assets/images/rice.png'
        },
        {
            Index: 6,
            Name: 'Almond',
            Description: 'NA',
            Rarity: 'common',
            Money: 45,
            Path: 'assets/images/almonds.png'
        },
        {
            Index: 7,
            Name: 'Ruby',
            Description: 'NA',
            Rarity: 'rare',
            Money: 100,
            Path: 'assets/images/ruby.png'
        },
        {
            Index: 8,
            Name: 'Cotton',
            Description: 'NA',
            Rarity: 'common',
            Money: 50,
            Path: 'assets/images/cotton.png'
        }
    ],
}

export default config;