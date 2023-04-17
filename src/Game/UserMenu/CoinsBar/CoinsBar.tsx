import { FC } from "react";
import { Container, Sprite, Text } from "@pixi/react";

import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";

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

    return (
        <Container
            x={width - 384 * scale}
            y={10 * scale}
            scale={scale}
            anchor={{ x: 0, y: 0 }}
        >
            <Sprite image={Img_CoinsBar} x={0} y={0} />

            <Sprite
                image={Img_Coin}
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
