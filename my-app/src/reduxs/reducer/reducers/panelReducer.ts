import { Action, constant, IPanelState } from "../../../reduxs";
import { panelStep } from "../../../model";

const defaultState: IPanelState = {
    state: panelStep.RULE,
    initial: true,
};

export default (state: IPanelState = defaultState, action: Action): IPanelState => {
    const { key, value } = action;
    console.log(state);
    if (action.type === constant.UPDATE_PANEL_STATE) {
        Object.defineProperty(state, key, { value: value });
        console.log(state);
        return { ...state };
    }
    else {
        return { ...state };
    }
};
