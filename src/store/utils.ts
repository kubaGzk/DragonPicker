import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from "../config";
import { GridElement, GridHeaders, Winner } from "../types";

export const calculateGrid = (
    level: number,
    scale: number,
): {
    gridElWidth: number;
    gridElHeight: number;
    gridElements: GridElement[];
    gridHeaders: GridHeaders[];
} => {
    const gridElements: GridElement[] = [];
    const gridHeaders: GridHeaders[] = [];

    const lvlGrid: number = level + 2;

    const gridWidth = BACKGROUND_WIDTH * 0.8 * scale;
    const gridHeight = BACKGROUND_HEIGHT * 0.8 * scale;

    const gridElWidth = gridWidth / (lvlGrid + 1);
    const gridElHeight = gridHeight / (lvlGrid + 1);

    const spaceWidth = gridElWidth / (lvlGrid + 1);
    const spaceHeight = gridElHeight / (lvlGrid + 1);

    for (let i = 0; i < lvlGrid; i++) {
        gridHeaders.push({
            x: i * (gridElWidth + spaceWidth) + spaceWidth,
            y: 0.2 * BACKGROUND_HEIGHT * scale,
            value: `x${(lvlGrid - i) * 2}`,
        });

        for (let j = 0; j < lvlGrid; j++) {
            gridElements.push({
                x: i * (gridElWidth + spaceWidth) + spaceWidth,
                y:
                    j * (gridElHeight + spaceHeight) +
                    0.2 * BACKGROUND_HEIGHT * scale,
                value: 0,
                id: `${i}${j}`,
                winner: false,
                collectable: false,
            });
        }
    }

    return { gridElHeight, gridElWidth, gridElements, gridHeaders };
};

export const selectWinners = (
    level: number,
    gridElements: GridElement[],
): { winners: Winner[] } => {
    const lvlGrid: number = level + 2;

    const x = Math.floor(Math.random() * lvlGrid);
    const y = Math.floor(Math.random() * lvlGrid);

    const winners: Winner[] = [];

    for (let i = lvlGrid - 1; i >= x; i--) {
        const lookInd = gridElements.findIndex((el) => el.id === `${i}${y}`);

        winners.push({
            x: gridElements[lookInd].x,
            y: gridElements[lookInd].y,
            id: `${i}${y}`,
        });
    }

    return { winners };
};

export const selectCollectables = (
    id: string,
    gridElements: GridElement[],
): { newGridElements: GridElement[]; win: number; itemsToCollect: boolean } => {
    const multiLevels = Math.sqrt(gridElements.length);

    let win: number = 0;
    let itemsToCollect: boolean = false;

    const newGridElements = gridElements.map((el) => {
        const [x, _] = el.id.split("");

        const multiplier = (multiLevels - parseInt(x)) * 2;

        if (el.id === id && el.value > 0) {
            itemsToCollect = true;
            win = el.value * multiplier;
            return { ...el, collectable: true, value: win };
        }
        return el;
    });

    return { newGridElements, win, itemsToCollect };
};

export const getWinElement = (
    id: string,
    gridElements: GridElement[],
): {
    newGridElements: GridElement[];
    itemsToCollect: boolean;
    collectedWin: number;
} => {
    let itemsToCollect: boolean = false;
    let collectedWin: number = 0;

    let newGridElements = gridElements.map((el) => {
        if (el.collectable && el.id === id) {
            collectedWin = el.value;
            return { ...el, collectable: false, value: 0, winner: false };
        }

        if (el.collectable) {
            itemsToCollect = true;
        }

        return el;
    });

    return { newGridElements, itemsToCollect, collectedWin };
};

export const getAllWinElements = (
    gridElements: GridElement[],
): {
    newGridElements: GridElement[];
    collectedWin: number;
} => {
    let collectedWin: number = 0;

    const newGridElements = gridElements.map((el) => {
        if (el.collectable) {
            collectedWin += el.value;
            return { ...el, collectable: false, value: 0, winner: false };
        } else {
            return { ...el, value: 0 };
        }
    });

    return { newGridElements, collectedWin };
};
