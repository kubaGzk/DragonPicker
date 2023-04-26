export const calculateDimension = (
    width: number,
    height: number,
    ind: number,
    numberOfLevels: number,
): { x: number; y: number } => {
    const space = width / (numberOfLevels + 1);
    const x = space + space * ind;
    const y = height / 2;

    return { x, y };
};
