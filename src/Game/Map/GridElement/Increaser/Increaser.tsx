import { Container, Sprite } from "@pixi/react";
import { FC } from "react";

import Img_Button_Block_High from "../../../../assets/Grid/Button_Block_High.png";
import Img_Button_Block_Low from "../../../../assets/Grid/Button_Block_Low.png";
import Img_Button_Plus from "../../../../assets/Grid/Button_Plus.png";
import Img_Button_Minus from "../../../../assets/Grid/Button_Minus.png";

interface IncreaserProps {
    type: "low" | "regular" | "high" | "blocked";
    x: number;
    y: number;
    width: number;
    height: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const Increaser: FC<IncreaserProps> = (props) => {
    const { x, y, width, height, type, onIncrease, onDecrease } = props;

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

    return (
        <Container x={x} y={y} width={width} height={height}>
            <Sprite
                image={topButton}
                x={0}
                y={0}
                width={width}
                height={height / 2}
                angle={topRotate}
                interactive={true}
                onclick={onIncrease}
                cursor={topCursor}
            />
            <Sprite
                image={lowButton}
                x={0}
                y={height / 2}
                width={width}
                height={height / 2}
                angle={lowRotate}
                interactive={true}
                onclick={onDecrease}
                cursor={lowCursor}
            />
        </Container>
    );
};

export default Increaser;
