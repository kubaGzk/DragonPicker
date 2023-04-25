import { Container, Sprite } from "@pixi/react";
import { FC } from "react";
import { Assets, Texture } from "pixi.js";

interface IncreaserProps {
    type: "low" | "regular" | "high" | "blocked";
    width: number;
    height: number;
    onIncrease: () => void;
    onDecrease: () => void;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const Increaser: FC<IncreaserProps> = (props) => {
    const {
        width,
        height,
        type,
        onIncrease,
        onDecrease,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    let topButton: Texture;
    let lowButton: Texture;

    let topRotate: number;
    let lowRotate: number;

    let topCursor: string;
    let lowCursor: string;

    switch (type) {
        case "low":
            topButton = Assets.get("plusButton");
            lowButton = Assets.get("blockLowButton");

            topRotate = 270;
            lowRotate = 270;

            topCursor = "pointer";
            lowCursor = "default";

            break;

        case "regular":
            topButton = Assets.get("plusButton");
            lowButton = Assets.get("minusButton");

            topRotate = 270;
            lowRotate = 270;

            topCursor = "pointer";
            lowCursor = "pointer";

            break;

        case "high":
            topButton = Assets.get("blockHighButton");
            lowButton = Assets.get("minusButton");

            topRotate = 270;
            lowRotate = 270;

            topCursor = "default";
            lowCursor = "pointer";

            break;

        case "blocked":
            topButton = Assets.get("blockHighButton");
            lowButton = Assets.get("blockLowButton");

            topRotate = 270;
            lowRotate = 270;

            topCursor = "default";
            lowCursor = "default";

            break;
    }

    const mouseEnterTop = () => {
        topCursor === "pointer" && turnPointerOnHandler();
    };

    const mouseLeaveTop = () => {
        topCursor === "pointer" && turnPointerOffHandler();
    };

    const mouseEnterBottom = () => {
        lowCursor === "pointer" && turnPointerOnHandler();
    };

    const mouseLeaveBottom = () => {
        lowCursor === "pointer" && turnPointerOffHandler();
    };

    return (
        <Container x={0.8 * width} y={0} height={height}>
            <Sprite
                texture={topButton}
                height={height / 2}
                width={height / 2}
                x={0}
                y={height / 2}
                angle={topRotate}
                interactive={true}
                onclick={onIncrease}
                onmouseenter={mouseEnterTop}
                onmouseleave={mouseLeaveTop}
            />
            <Sprite
                texture={lowButton}
                x={0}
                height={height / 2}
                width={height / 2}
                y={height}
                angle={lowRotate}
                interactive={true}
                onclick={onDecrease}
                onmouseenter={mouseEnterBottom}
                onmouseleave={mouseLeaveBottom}
            />
        </Container>
    );
};

export default Increaser;
