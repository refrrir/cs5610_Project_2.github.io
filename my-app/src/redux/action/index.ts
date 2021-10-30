import { AnyAction } from "redux";

export default interface Action extends AnyAction {
    key: any,
    value: any,
}
