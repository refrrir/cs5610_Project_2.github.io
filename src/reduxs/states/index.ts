import IBoardState from "./IBoardState";
import IPanelState from "./IPanelState";
interface IAppState{
    board: IBoardState;
    panel: IPanelState;
}
export type {
    IBoardState,
    IAppState,
    IPanelState
}