import { Action, constant, IPanelState } from "../../../reduxs";
import { panelStep } from "../../../model";

const defaultState: IPanelState = {
    state: panelStep.RULE,
    initial: true,
};

export default (state: IPanelState, action: Action): IPanelState => {
    if (state == null){
        if (localStorage.getItem("panelState") !== null){
            state = JSON.parse(localStorage.getItem("panelState")!);
        }else{
            state = defaultState;
        }
    }
    const { key, value } = action;
    if (action.type === constant.UPDATE_PANEL_STATE) {
        Object.defineProperty(state, key, { value: value });
        localStorage.setItem("panelState", JSON.stringify({ ...state }));
        return { ...state };
    }
    else {
        return { ...state };
    }
};
