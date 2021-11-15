import { panelStep } from "../../model"

export default interface IPanelState {
    state: panelStep;
    initial?: boolean
}