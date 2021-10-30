import { Action, constant } from "../../../reduxs";

const setValue: (key: string, value: any) => Action =
    (key, value) => ({
        key: key,
        value: value,
        type: constant.UPDATE_BOARD_STATE,
    })

export {
    setValue
}