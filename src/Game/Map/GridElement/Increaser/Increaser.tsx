import { Container, Sprite } from "@pixi/react";
import { FC } from "react";

import Img_Button_Block_High from "../../../../assets/Grid/Button_Block_High.png";
import Img_Button_Block_Low from "../../../../assets/Grid/Button_Block_Low.png";
import Img_Button_Plus from "../../../../assets/Grid/Button_Plus.png";
import Img_Button_Minus from "../../../../assets/Grid/Button_Minus.png";

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

    let topButton: string;
    let lowButton: string;

    let topRotate: number;
    let lowRotate: number;

    let topCursor: string;
    let lowCursor: string;

    switch (type) {
        case "low":
            topButton = Img_Button_Plus;
            lowButton = Img_Button_Block_Low;

            topRotate = 270;
            lowRotate = 270;

            topCursor = "pointer";
            lowCursor = "default";

            break;

        case "regular":
            topButton = Img_Button_Plus;
            lowButton = Img_Button_Minus;

            topRotate = 270;
            lowRotate = 270;

            topCursor = "pointer";
            lowCursor = "pointer";

            break;

        case "high":
            topButton = Img_Button_Block_High;
            lowButton = Img_Button_Minus;

            topRotate = 270;
            lowRotate = 270;

            topCursor = "default";
            lowCursor = "pointer";

            break;

        case "blocked":
            topButton = Img_Button_Block_High;
            lowButton = Img_Button_Block_Low;

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
                image={topButton}
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
                image={lowButton}
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
