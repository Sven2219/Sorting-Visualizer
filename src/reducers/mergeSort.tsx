
export interface IState {
    isModalOpen: boolean;
    arrayForSort: string;

}
type setIsModalOpen = {
    readonly type: "setIsModalOpen";
    readonly payload: boolean;
}
type setArrayForSort = {
    readonly type: "setArrayForSort";
    readonly payload: string;
}

export type Actions = setIsModalOpen | setArrayForSort ;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsModalOpen":
            return { ...state, isModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        default:
            return state;
    }
}