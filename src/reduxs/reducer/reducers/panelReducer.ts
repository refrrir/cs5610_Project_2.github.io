import { Action, constant, IPanelState } from "../../../reduxs";
import { panelStep } from "../../../model";

const defaultState: IPanelState = {
    state: panelStep.RULE,
    initial: true,
};

export default (state: IPanelState = defaultState, action: Action): IPanelState => {
    const { key, value } = action;
    if (action.type === constant.UPDATE_PANEL_STATE) {
        Object.defineProperty(state, key, { value: value });
        return { ...state };
    }
    else {
        return { ...state };
    }
};
