import { GridElement, Winner } from "./types";

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

export const calculateGrid = (
    level: number,
    width: number,
    height: number,
): {
    gridElWidth: number;
    gridElHeight: number;
    gridElements: GridElement[];
} => {
    const gridElements: GridElement[] = [];

    const lvlGrid: number = level + 2;

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

export const scaleCalculator = (width: number, height: number) => {
    const scaleW = width / 1920;
    const scaleH = height / 1080;

    return scaleW > scaleH ? scaleH : scaleW;
};
