import { FC, useEffect, useState } from "react";
import { Container, Sprite, Text } from "@pixi/react";

import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";
import MenuItemsAssets from "../../../assets/UI/Menu/MenuItems.json";

import { coinsTextStyle } from "../../../styles";
import { BaseTexture, Spritesheet, Texture } from "pixi.js";

interface CoinsBarProps {
    width: number;
    height: number;
    coins: number;
    scale: number;
    // menuItems: Spritesheet;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width, coins, scale, } = props;

    const stringCoins = coins.toString();

    const [sprites, setSprites] = useState<Spritesheet | null>(null);

    const loader = async (callback: (arg: Spritesheet | null) => void) => {
        const MenuItemsSprites = new Spritesheet(
            BaseTexture.from(MenuItemsAssets.meta.image),
            MenuItemsAssets,
        );

        await MenuItemsSprites.parse();

        callback(MenuItemsSprites);
    };

    useEffect(() => {
        (async () => {
            await loader(setSprites);
        })();
    }, []);

    console.log(sprites?.textures["Coin.png"]);

    return (
        <Container
            x={width - 384 * scale}
            y={10 * scale}
            scale={scale}
            anchor={{ x: 0, y: 0 }}
        >
            <Sprite image={Img_CoinsBar} x={0} y={0} />

            {sprites && (
                <Sprite
                    texture={sprites.textures["Coin.png"]}
                    anchor={{ x: 0, y: 0.5 }}
                    y={43}
                    x={-20}
                    scale={0.95}
                />
            )}

            <Text
                text={stringCoins}
                style={coinsTextStyle}
                anchor={{ x: 0, y: 0.5 }}
                x={90}
                y={43}
            />
        </Container>
    );
};

export default CoinsBar;
