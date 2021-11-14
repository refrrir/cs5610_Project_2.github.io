export enum BoardType {
    NULL = 0,
    MINE = 1,
    OPPONENT = 2,
}

export interface Position {
    x: number,
    y: number,
}

export enum PlayMode {
    NORMAL = 1,
    SINGLE = 2,
}