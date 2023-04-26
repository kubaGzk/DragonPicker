import { Assets } from "pixi.js";

import background0 from "./assets/Background/Battleground0.png";
import background1 from "./assets/Background/Battleground1.png";
import background2 from "./assets/Background/Battleground2.png";
import background3 from "./assets/Background/Battleground3.png";
import level1 from "./assets/Level/Level1.png";
import level2 from "./assets/Level/Level2.png";
import level3 from "./assets/Level/Level3.png";
import attack1 from "./assets/Dragon/Attack1.png";
import attack2 from "./assets/Dragon/Attack2.png";
import attack3 from "./assets/Dragon/Attack3.png";
import attack4 from "./assets/Dragon/Attack4.png";
import fireAttack2 from "./assets/Dragon/Fire_Attack2.png";
import fireAttack3 from "./assets/Dragon/Fire_Attack3.png";
import fireAttack4 from "./assets/Dragon/Fire_Attack4.png";
import fireAttack5 from "./assets/Dragon/Fire_Attack5.png";
import fireAttack6 from "./assets/Dragon/Fire_Attack6.png";
import walk1 from "./assets/Dragon/Walk1.png";
import walk2 from "./assets/Dragon/Walk2.png";
import walk3 from "./assets/Dragon/Walk3.png";
import walk4 from "./assets/Dragon/Walk4.png";
import walk5 from "./assets/Dragon/Walk5.png";
import playButton from "./assets/UI/Buttons/Play.png";
import endGameButton from "./assets/UI/Buttons/EndGame.png";
import collectAllButton from "./assets/UI/Buttons/CollectAll.png";
import blockHighButton from "./assets/UI/Buttons/Button_Block_High.png";
import blockLowButton from "./assets/UI/Buttons/Button_Block_Low.png";
import minusButton from "./assets/UI/Buttons/Button_Minus.png";
import plusButton from "./assets/UI/Buttons/Button_Plus.png";
import coin from "./assets/UI/Menu/Coin.png";
import coinsBar from "./assets/UI/Menu/CoinsBar.png";
import gameLogo from "./assets/UI/Menu/GameLogo.png";
import menu from "./assets/UI/Menu/Menu.png";
import userBar from "./assets/UI/Menu/UserBar.png";
import clickSound from "./assets/Sounds/Click.wav";

export const assetLoader = (onResolve: () => void, onError: () => void) => {
    Assets.addBundle("dragon", {
        attack1,
        attack2,
        attack3,
        attack4,
        fireAttack2,
        fireAttack3,
        fireAttack4,
        fireAttack5,
        fireAttack6,
        walk1,
        walk2,
        walk3,
        walk4,
        walk5,
    });

    Assets.addBundle("buttons", {
        playButton,
        endGameButton,
        collectAllButton,
        blockHighButton,
        blockLowButton,
        plusButton,
        minusButton,
    });

    Assets.addBundle("levels", { level1, level2, level3 });

    Assets.addBundle("backgrounds", {
        background0,
        background1,
        background2,
        background3,
    });

    Assets.addBundle("menu", {
        coin,
        coinsBar,
        gameLogo,
        menu,
        userBar,
    });

    Assets.addBundle("sounds", {
        clickSound,
    });

    const load = async () => {
        try {
            await Assets.loadBundle("dragon");
            await Assets.loadBundle("buttons");
            await Assets.loadBundle("levels");
            await Assets.loadBundle("backgrounds");
            await Assets.loadBundle("menu");
            await Assets.loadBundle("sounds");

            onResolve();
        } catch (err) {
            onError();
            console.log(err);
        }
    };

    load();
};
