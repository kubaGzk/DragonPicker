import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { FC, useCallback, useState } from "react";
import { calculateDimension } from "../../../utils";

interface LevelProps {
    img_url: string;
    name: string;
    multiplier: string;
    index: number;
    width: number;
    height: number;
    onClick: () => void;
}

const Level: FC<LevelProps> = (props) => {
    const { img_url, name, multiplier, index, width, height, onClick } = props;

    const { x, y, itemWidth, itemHeight } = calculateDimension(
        width,
        height,
        index,
    );

    const [pixelChange, setPixelChange] = useState<number>(0);

    const multiTextStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 20,
        fontWeight: "800",
        fill: ["#996c0a", "#e1e430"], // gradient
        stroke: "#e1e430",
        strokeThickness: 0,
        letterSpacing: 1,
        dropShadow: true,
        dropShadowColor: "#5c5610",
        dropShadowBlur: 8,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
    });

    const textStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 50,
        fontWeight: "400",
        fill: ["#ffffff", "#00ff99"], // gradient
        stroke: "#01d27e",
        strokeThickness: 5,
        letterSpacing: 10,
        dropShadow: true,
        dropShadowColor: "#ccced2",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const draw = useCallback((g: any) => {
        g.clear();

        g.lineStyle(2, 0xff00bb, 1);
        g.beginFill(0xff00bb, 0.25);
        g.drawRoundedRect(0, 0, 300, 400, 15);
        g.endFill();
    }, []);

    return (
        <Container
            height={itemHeight}
            width={itemWidth}
            x={x}
            y={y}
            interactive={true}
            onmouseenter={(e) => {
                console.log("on");

                textStyle.letterSpacing = 12;

                setPixelChange(5);
            }}
            onmouseleave={(e) => {
                console.log("on");

                textStyle.letterSpacing = 10;
                setPixelChange(0);
            }}
            onclick={onClick}
        >
            <Graphics draw={draw} />

            <Sprite
                image={img_url}
                x={55 - pixelChange}
                y={5 - pixelChange}
                width={190 + 2 * pixelChange}
                height={290 + 2 * pixelChange}
            />
            <Text
                text={`MAX Multipier ${multiplier}`}
                style={multiTextStyle}
                x={10 - pixelChange}
                y={10 - pixelChange}
                anchor={0}
            />
            <Text
                text={name}
                style={textStyle}
                x={50}
                y={295 + pixelChange}
                width={220}
            />
        </Container>
    );
};

export default Level;
