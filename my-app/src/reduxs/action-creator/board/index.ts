import { Action, constant } from "../../../reduxs";
import { Position } from "../../../model";

const setValue: (key: string, value: Position) => Action =
    (key, value) => ({
        key: key,
        value: value,
        type: constant.UPDATE_BOARD_STATE,
    })

export {
    setValue
}