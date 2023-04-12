import { GridElement, Level, Winner } from "./types";

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
    level: Level,
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
                collectable: false,
            });
        }
    }

    return { gridElHeight, gridElWidth, gridElements };
};

export const selectWinners = (
    level: Level,
    gridElements: GridElement[],
): { winners: Winner[] } => {
    const lvlGrid: 3 | 4 | 5 = level === 1 ? 3 : level === 2 ? 4 : 5;

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

        const multiplier = multiLevels - parseInt(x) * 2;

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
        }

        return el;
    });

    return { newGridElements, collectedWin };
};
