export interface GridElement {
    x: number;
    y: number;
    value: number;
    id: string;
    winner: boolean;
    collectable: boolean;
}

export interface GridHeaders {
    x: number;
    y: number;
    value: string;
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

export interface LeaderboardItem {
    index: number;
    username: string;
    coins: number;
}
