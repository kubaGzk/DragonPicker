export interface GridElement {
    x: number;
    y: number;
    value: number;
    id: string;
    winner: boolean;
    collectable: boolean;
}

export type Level = 1 | 2 | 3;

export interface Winner {
    x: number;
    y: number;
    id: string;
}
