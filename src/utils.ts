import { GridElement } from "./types";

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

export const calculateGrid = (
    level: 1 | 2 | 3,
    width: number,
    height: number,
): {
    gridElWidth: number;
    gridElHeight: number;
    gridElements: GridElement[];
} => {
    const gridElements: GridElement[] = [];

    const lvlGrid: 3 | 4 | 5 = level === 1 ? 3 : level === 2 ? 4 : 5;

    const gridWidth = width * 0.75;
    const gridHeight = height * 0.8;

    const widthSpace = gridWidth / lvlGrid;
    const heightSpace = gridHeight / lvlGrid;

    let gridElWidth = level === 1 ? 160 : level === 2 ? 120 : 100;
    let gridElHeight = level === 1 ? 120 : level === 2 ? 90 : 75;

    if (width < 960) {
        gridElWidth = level === 1 ? 120 : level === 2 ? 100 : 80;
        gridElHeight = level === 1 ? 90 : level === 2 ? 75 : 60;
    }

    if (height < 540) {
        gridElWidth = level === 1 ? 120 : level === 2 ? 100 : 80;
        gridElHeight = level === 1 ? 90 : level === 2 ? 75 : 60;
    }

    for (let i = 0; i < lvlGrid; i++) {
        for (let j = 0; j < lvlGrid; j++) {
            gridElements.push({
                x: i * widthSpace + 0.05 * width,
                y: j * heightSpace + 0.2 * height,
                value: 0,
                id: `${i}${j}`,
                winner: false,
            });
        }
    }

    return { gridElHeight, gridElWidth, gridElements };
};

export const selectWinners = (
    level: 1 | 2 | 3,
    gridElements: GridElement[],
): { winners: string[]; winnersPosition: { x: number; y: number }[] } => {
    const lvlGrid: 3 | 4 | 5 = level === 1 ? 3 : level === 2 ? 4 : 5;

    const x = Math.floor(Math.random() * lvlGrid);
    const y = Math.floor(Math.random() * lvlGrid);

    console.log("WINNERS", x, y);

    const winners: string[] = [];
    const winnersPosition: { x: number; y: number }[] = [];

    for (let i = lvlGrid - 1; i >= x; i--) {
        const lookInd = gridElements.findIndex((el) => el.id === `${i}${y}`);

        winners.push(`${i}${y}`);

        winnersPosition.push({
            x: gridElements[lookInd].x,
            y: gridElements[lookInd].y,
        });
    }

    return { winners, winnersPosition };
};
