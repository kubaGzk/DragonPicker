import { FC, useEffect } from "react";
import { Container, Sprite, Text, useApp } from "@pixi/react";

import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";
import MenuItemsAssets from "../../../assets/UI/Menu/MenuItems.json";

import { coinsTextStyle } from "../../../styles";
import { BaseTexture, Spritesheet } from "pixi.js";

interface CoinsBarProps {
    width: number;
    height: number;
    coins: number;
    scale: number;
    menuItems: Spritesheet;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width, coins, scale, menuItems } = props;

    const stringCoins = coins.toString();

    const MenuItemsSprites = new Spritesheet(
        BaseTexture.from(MenuItemsAssets.meta.image),
        MenuItemsAssets,
    );


    return (
        <Container
            x={width - 384 * scale}
            y={10 * scale}
            scale={scale}
            anchor={{ x: 0, y: 0 }}
        >
            <Sprite image={Img_CoinsBar} x={0} y={0} />

            {menuItems && (
                <Sprite
                    texture={menuItems.textures["CoinsBar.png"]}
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
