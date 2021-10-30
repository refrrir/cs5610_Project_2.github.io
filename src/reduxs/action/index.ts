import { AnyAction } from "redux";

export interface Action extends AnyAction {
    key: any,
    value: any,
}
