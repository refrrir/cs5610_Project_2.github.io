import { Action, constant, IBoardState } from "../../../reduxs";
import { BoardType, PlayMode, Position, ShipType, SquareState } from "../../../model";

const defaultState: IBoardState = {
    myBoardInfo: generateRandomBoat(),
    opponentBoardInfo: generateRandomBoat(),
    winner: BoardType.NULL,
    mode: PlayMode.NORMAL,
};

function generateRandomBoat() {
    let shipArray = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => SquareState.None))
    let shipTypeArray = [ShipType.five_one, ShipType.four_one, ShipType.three_one, ShipType.three_one, ShipType.two_one];
    for (let ship of shipTypeArray) {
        let length = ship;
        while (true) {
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            let direction = Math.floor(Math.random() * 2);
            let isOccupied = false;
            let positions: Position[] = [];
            if (direction === 0) {
                if (randomX < 5) {
                    for (let i = randomX; i < randomX + length; i++) {
                        positions.push({ x: i, y: randomY });
                        if (shipArray[i][randomY] === SquareState.HasShip) {
                            isOccupied = true;
                        }
                    }
                } else {
                    for (let i = randomX; i > randomX - length; i--) {
                        positions.push({ x: i, y: randomY });
                        if (shipArray[i][randomY] === SquareState.HasShip) {
                            isOccupied = true;
                        }
                    }
                }
            } else {
                if (randomY < 5) {
                    for (let i = randomY; i < randomY + length; i++) {
                        positions.push({ x: randomX, y: i });
                        if (shipArray[randomX][i] === SquareState.HasShip) {
                            isOccupied = true;
                        }
                    }
                } else {
                    for (let i = randomY; i > randomY - length; i--) {
                        positions.push({ x: randomX, y: i });
                        if (shipArray[randomX][i] === SquareState.HasShip) {
                            isOccupied = true;
                        }
                    }
                }
            }
            if (!isOccupied) {
                for (let position of positions) {
                    shipArray[position.x][position.y] = SquareState.HasShip;
                }
                break;
            }
        }
    }

    return shipArray;
}

function checkIfWin(info: SquareState[][]): boolean {
    for (let i = 0; i < info.length; i++) {
        for (let j = 0; j < info[i].length; j++) {
            if (info[i][j] === SquareState.HasShip) {
                return false;
            }
        }
    }
    return true;
}

function updateBoardStatus(board: SquareState[][], value: Position) {
    if (board[value.x][value.y] === SquareState.None) {
        board[value.x][value.y] = SquareState.Damaged;
    }
    if (board[value.x][value.y] === SquareState.HasShip) {
        board[value.x][value.y] = SquareState.HasShipDamaged;
    }
}

function getRandomNoDamagedPosition(board: SquareState[][]) {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    while (board[randomX][randomY] === SquareState.Damaged || board[randomX][randomY] === SquareState.HasShipDamaged) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
    }
    return { x: randomX, y: randomY };
}

export default (state: IBoardState = defaultState, action: Action): IBoardState => {
    const { key, value } = action;
    console.log(state);
    if (action.type === constant.UPDATE_BOARD_STATE) {
        if (key === "opponentBoardInfo") {
            let board = [...state.opponentBoardInfo];
            updateBoardStatus(board, value);
            Object.defineProperty(state, "opponentBoardInfo", { value: board });
            if (checkIfWin(board)) {
                Object.defineProperty(state, "winner", { value: BoardType.MINE });
                return { ...state };
            }
            if (state.mode === PlayMode.NORMAL) {
                board = [...state.myBoardInfo];
                updateBoardStatus(board, getRandomNoDamagedPosition(board));
                Object.defineProperty(state, "myBoardInfo", { value: board });
                if (checkIfWin(board)) {
                    Object.defineProperty(state, "winner", { value: BoardType.OPPONENT });
                    return { ...state };
                }
            }
        }
        return { ...state };
    }
    else if (action.type === constant.UPDATE_PLAY_MODE) {
        Object.defineProperty(state, "mode", { value: value });
        return { ...state };
    }
    else if (action.type === constant.INITIAL_BOARD_STATE) {
        return {
            myBoardInfo: generateRandomBoat(),
            opponentBoardInfo: generateRandomBoat(),
            winner: BoardType.NULL,
            mode: state.mode,
        };
    }
    else {
        return { ...state };
    }
};
