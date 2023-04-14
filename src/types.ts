export interface GridElement {
    x: number;
    y: number;
    value: number;
    id: string;
    winner: boolean;
    collectable: boolean;
}

export interface Winner {
    x: number;
    y: number;
    id: string;
}

export enum CurrentStatus {
    Start,
    Play,
    Collect,
}
