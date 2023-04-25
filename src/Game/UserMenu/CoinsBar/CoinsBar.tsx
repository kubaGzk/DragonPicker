import { FC } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { Assets, Texture } from "pixi.js";
import { coinsTextStyle } from "../../../styles";

interface CoinsBarProps {
    width: number;
    height: number;
    coins: number;
    scale: number;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width, coins, scale } = props;

    const stringCoins = coins.toString();

    const coinsBar: Texture = Assets.get("coinsBar");
    const coin: Texture = Assets.get("coin");

    return (
        <Container
            x={width - 384 * scale}
            y={10 * scale}
            scale={scale}
            anchor={{ x: 0, y: 0 }}
        >
            <Sprite texture={coinsBar} x={0} y={0} />

            <Sprite
                texture={coin}
                anchor={{ x: 0, y: 0.5 }}
                y={43}
                x={-20}
                scale={0.95}
            />

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
