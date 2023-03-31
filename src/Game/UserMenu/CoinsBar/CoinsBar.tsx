import { FC } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import Img_Coin from "../../../assets/UI/Menu/Coin.png";
import Img_CoinsBar from "../../../assets/UI/Menu/CoinsBar.png";
import { useAppSelector } from "../../../hooks/hooks";

interface CoinsBarProps {
    width: number;
    height: number;
}

const CoinsBar: FC<CoinsBarProps> = (props) => {
    const { width } = props;

    const { coins } = useAppSelector((state) => state.auth);
    console.log(coins, "COINS");
    const stringCoins = coins.toString();

    const coinsStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 20,
        fontWeight: "900",
        fill: ["#ffffff", "#FCEE21"], // gradient
        stroke: "#c8a11fe6",
        strokeThickness: 5,
        letterSpacing: 10,
        dropShadow: true,
        dropShadowColor: "#444a57",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
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
                style={coinsStyle}
                x={60}
                y={20}
                width={stringCoins.length * 18}
            />
        </Container>
    );
};

export default CoinsBar;
