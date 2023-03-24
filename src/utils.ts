export const calculateDimension = (
    width: number,
    height: number,
    ind: number,
): { x: number; y: number; itemWidth: number; itemHeight: number } => {
    let itemWidth = 300;
    let itemHeight = 400;
    if (width <= 960) {
        itemWidth = 200;
        itemHeight = 267;
    }

    if (height < 550) {
        itemWidth = 200;
        itemHeight = 267;
    }
    const space = (width - 3 * itemWidth) / 4;
    const x = space + (itemWidth + space) * ind;
    const y = (height - itemHeight) / 2;

    return { x, y, itemWidth, itemHeight };
};
