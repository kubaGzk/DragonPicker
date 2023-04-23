import { Assets, BaseTexture, Spritesheet } from "pixi.js";
import DragonAssets from "./assets/Dragon/Dragon.json";
import ButtonAssets from "./assets/Grid/Button.json";
import LevelAssets from "./assets/Level/Level.json";
import GameControlsAssets from "./assets/UI/GameControls/GameControls.json";
import MenuItemsAssets from "./assets/UI/Menu/MenuItems.json";
import Background0 from "./assets/Background/Battleground0.png";
import Background1 from "./assets/Background/Battleground1.png";
import Background2 from "./assets/Background/Battleground2.png";
import Background3 from "./assets/Background/Battleground3.png";

export interface SpritesState {
    dragon: Spritesheet;
    button: Spritesheet;
    level: Spritesheet;
    gameControl: Spritesheet;
    menuItems: Spritesheet;
}

export const assetLoader = (onResolve: () => void, onError?: () => void) => {
    const DragonSprites = new Spritesheet(
        BaseTexture.from(DragonAssets.meta.image),
        DragonAssets,
    );
    const ButtonSprites = new Spritesheet(
        BaseTexture.from(ButtonAssets.meta.image),
        ButtonAssets,
    );
    const LevelSprites = new Spritesheet(
        BaseTexture.from(LevelAssets.meta.image),
        LevelAssets,
    );
    const GameControlsSprites = new Spritesheet(
        BaseTexture.from(GameControlsAssets.meta.image),
        GameControlsAssets,
    );
    const MenuItemsSprites = new Spritesheet(
        BaseTexture.from(MenuItemsAssets.meta.image),
        MenuItemsAssets,
    );

    Assets.addBundle("backgrounds", {
        Background0: Background0,
        Background1: Background1,
        Background2: Background2,
        Background3: Background3,
    });

    const load = async () => {
        try {
            await DragonSprites.parse();
            await ButtonSprites.parse();
            await LevelSprites.parse();
            await GameControlsSprites.parse();
            await MenuItemsSprites.parse();

            await Assets.loadBundle("backgrounds");

            onResolve();
        } catch (err) {}
    };

    load();

    return {
        dragon: DragonSprites,
        button: ButtonSprites,
        level: LevelSprites,
        gameControl: GameControlsSprites,
        menuItems: MenuItemsSprites,
    };
};
