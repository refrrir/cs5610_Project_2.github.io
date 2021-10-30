import constants from "../../constants";
import Action from "../../action/index";

const setValue: (key: string, value: any) => Action =
    (key, value) => ({
        key: key,
        value: value,
        type: constants.UPDATE_BOARD_STATE,
    })

export {
    setValue
}