import { Action, constant } from "../../../reduxs";
import { PlayMode, Position } from "../../../model";

const setValue: (key: string, value: Position) => Action =
    (key, value) => ({
        key: key,
        value: value,
        type: constant.UPDATE_BOARD_STATE,
    })

const setMode: (value: PlayMode) => Action =
    (value) => ({
        value: value,
        type: constant.UPDATE_PLAY_MODE,
    })

const initial: () => Action =
    () => ({
        type: constant.INITIAL_BOARD_STATE,
    })

export {
    setValue,
    initial,
    setMode
}