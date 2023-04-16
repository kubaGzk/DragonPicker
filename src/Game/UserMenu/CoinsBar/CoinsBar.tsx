import { FC } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";
import { coinsTextStyle } from "../../../styles";
import { scaleCalculator } from "../../../utils";

interface CoinsBarProps {
    width: number;
    height: number;
    coins: number;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width, coins, height } = props;

    const stringCoins = coins.toString();
    const scale = scaleCalculator(width, height);

    return (
        <Container
            x={width - 354 * scale -30}
            y={10}
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
