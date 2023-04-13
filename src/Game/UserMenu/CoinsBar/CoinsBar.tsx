import { FC } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";
import { coinsTextStyle } from "../../../styles";

interface CoinsBarProps {
    width: number;
    height: number;
    coins: number;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width, coins } = props;

    const stringCoins = coins.toString();

    return (
        <Container x={width - 280} y={10}>
            <Sprite
                image={Img_CoinsBar}
                x={0}
                y={10}
                width={250}
                height={60}
                anchor={0}
            />
            <Sprite image={Img_Coin} x={-30} y={0} width={80} height={80} />

            <Text
                text={stringCoins}
                style={coinsTextStyle}
                x={60}
                y={20}
                width={stringCoins.length * 18}
            />
        </Container>
    );
};

export default CoinsBar;
