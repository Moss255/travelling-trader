interface Config {
    MAX_DAYS: number;
    STARTING_DAY: number;
    TRADER_RARITY: number;
    POOR_MAN_RARITY: number;
    ITEM_RARITY: number;
    KHUMS: number;
    ITEMS: ConfigItem[];
    TIME_PERSON_SHOWN: number;
    PLAYER_COMMON_THRESHOLD: number;
    PLAYER_RARE_THRESHOLD: number;
    PLAYER_VERY_RARE_THRESHOLD: number;
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
    MAX_DAYS: 30,
    STARTING_DAY: 1,
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
            Money : 100,
            Path: 'assets/goldbar.png'
        },
        {
            Index: 1,
            Name : "Gold Ring",
            Description : "NA",
            Rarity : "rare",
            Money : 100,
            Path: 'assets/goldring.png'
        },
        {
            Index: 2,
            Name : "Water",
            Description : "+5 to energy",
            Rarity : "common",
            Money : 5,
            Path: 'assets/water.png'
        },
        {
            Index: 3,
            Name : "Diamond",
            Description : "NA",
            Rarity: "very-rare",
            Money : 200,
            Path: 'assets/diamond.png'
        },
        {
            Index: 4,
            Name: 'Necklace',
            Description: 'NA',
            Rarity: 'very-rare',
            Money: 150,
            Path: 'assets/necklace.png'
        },
        {
            Index: 5,
            Name: 'Rice',
            Description: 'NA',
            Rarity: 'common',
            Money: 50,
            Path: 'assets/rice.png'
        },
        {
            Index: 6,
            Name: 'Almond',
            Description: 'NA',
            Rarity: 'common',
            Money: 45,
            Path: 'assets/almonds.png'
        },
        {
            Index: 7,
            Name: 'Ruby',
            Description: 'NA',
            Rarity: 'rare',
            Money: 100,
            Path: 'assets/ruby.png'
        },
        {
            Index: 8,
            Name: 'Cotton',
            Description: 'NA',
            Rarity: 'common',
            Money: 50,
            Path: 'assets/cotton.png'
        }
    ],
}

export default config;