import { Assets } from "pixi.js";

export interface IAssets {
    name: string;
    srcs: string;
}

export interface IBundle {
    name: string;
    assets: IAssets[];
}

export const assetLoader = async (
    levelPaths: string[],
    battlegroundPaths: string[],
    onResolve: () => void,
    onError?: () => void,
) => {
    const levels: IBundle = {
        name: "levels",
        assets: [
            { name: "Level1", srcs: "./assets/Level/Level1.png" },
            { name: "Level2", srcs: "./assets/Level/Level2.png" },
            { name: "Level3", srcs: "./assets/Level/Level3.png" },
        ],
    };

    const battleground: IBundle = {
        name: "battleground",
        assets: [
            {
                name: "Battleground0",
                srcs: "./assets/Battleground/Battleground0.png",
            },
            {
                name: "Battleground1",
                srcs: "./assets/Battleground/Battleground1.png",
            },
            {
                name: "Battleground2",
                srcs: "./assets/Battleground/Battleground2.png",
            },
            {
                name: "Battleground3",
                srcs: "./assets/Battleground/Battleground3.png",
            },
        ],
    };

    const dragon: IBundle = {
        name: "dragon",
        assets: [
            {
                name: "Attack1",
                srcs: "./assets/Dragon/Attack1.png",
            },
            {
                name: "Attack2",
                srcs: "./assets/Dragon/Attack2.png",
            },
            {
                name: "Attack3",
                srcs: "./assets/Dragon/Attack3.png",
            },
            {
                name: "Attack4",
                srcs: "./assets/Dragon/Attack4.png",
            },
            {
                name: "Fire_Attack1",
                srcs: "./assets/Dragon/Fire_Attack1.png",
            },
            {
                name: "Fire_Attack2",
                srcs: "./assets/Dragon/Fire_Attack2.png",
            },
            {
                name: "Fire_Attack3",
                srcs: "./assets/Dragon/Fire_Attack3.png",
            },
            {
                name: "Fire_Attack4",
                srcs: "./assets/Dragon/Fire_Attack4.png",
            },
            {
                name: "Fire_Attack5",
                srcs: "./assets/Dragon/Fire_Attack5.png",
            },
            {
                name: "Fire_Attack6",
                srcs: "./assets/Dragon/Fire_Attack6.png",
            },
            {
                name: "Walk1",
                srcs: "./assets/Dragon/Walk1.png",
            },
            {
                name: "Walk2",
                srcs: "./assets/Dragon/Walk2.png",
            },
            {
                name: "Walk3",
                srcs: "./assets/Dragon/Walk3.png",
            },
            {
                name: "Walk4",
                srcs: "./assets/Dragon/Walk4.png",
            },
            {
                name: "Walk5",
                srcs: "./assets/Dragon/Walk5.png",
            },
        ],
    };

    const grid: IBundle = {
        name: "grid",
        assets: [
            {
                name: "Button_Block_High",
                srcs: "./assets/Grid/Button_Block_High.png",
            },
            {
                name: "Button_Block_Low",
                srcs: "./assets/Grid/Button_Block_Low.png",
            },
            {
                name: "Button_Minus",
                srcs: "./assets/Grid/Button_Minus.png",
            },
            {
                name: "Button_Plus",
                srcs: "./assets/Grid/Button_Plus.png",
            },
        ],
    };

    const gameControls: IBundle = {
        name: "gameControls",
        assets: [
            {
                name: "ColectAll",
                srcs: "./assets/UI/GameControls/ColectAll.png",
            },
            {
                name: "EndGame",
                srcs: "./assets/UI/GameControls/EndGame.png",
            },
            {
                name: "Play",
                srcs: "./assets/UI/GameControls/Play.png",
            },
        ],
    };

    const logo: IBundle = {
        name: "logo",
        assets: [
            {
                name: "GameLogo",
                srcs: "./assets/UI/GameLogo/GameLogo.png",
            },
        ],
    };

    const menu: IBundle = {
        name: "menu",
        assets: [
            {
                name: "Coin",
                srcs: "./assets/UI/Menu/Coin.png",
            },
            {
                name: "CoinsBar",
                srcs: "./assets/UI/Menu/CoinsBar.png",
            },
            {
                name: "Menu",
                srcs: "./assets/UI/Menu/Menu.png",
            },
            {
                name: "UserBar",
                srcs: "./assets/UI/Menu/UserBar.png",
            },
        ],
    };

    const textureBundles: IBundle[] = [
        levels,
        battleground,
        dragon,
        grid,
        gameControls,
        logo,
        menu,
    ];

    // Assets.addBundle("levels2", {
    //     1: "./assets/Level/Level1.png",
    //     2: "./assets/Level/Level2.png",
    //     3: "./assets/Level/Level3.png",
    // });
    const load = async () => {
        await Assets.init({
            manifest: { bundles: textureBundles },
        });

        try {
            const levels = await Assets.loadBundle("levels2");
            // await Assets.loadBundle("battleground");
            // await Assets.loadBundle("dragon");
            // await Assets.loadBundle("grid");
            // await Assets.loadBundle("gameControls");
            // await Assets.loadBundle("logo");
            // await Assets.loadBundle("menu");
            onResolve();
        } catch (err) {
            console.log(err);
        }
    };

    load();
};
