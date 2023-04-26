import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from "../config";

export const scaleCalculator = (width: number, height: number) => {
    const scaleW = width / BACKGROUND_WIDTH;
    const scaleH = height / BACKGROUND_HEIGHT;

    return scaleW > scaleH ? scaleH : scaleW;
};
