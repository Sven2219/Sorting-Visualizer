
export interface IState {
    isModalOpen: boolean;
    arrayForSort: string;
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
    };
    isPaused: boolean;
}
type setIsModalOpen = {
    readonly type: "setIsModalOpen";
    readonly payload: boolean;
}
type setArrayForSort = {
    readonly type: "setArrayForSort";
    readonly payload: string;
}
type setProcedureOfSorting = {
    readonly type: "setProcedureOfSorting";
    readonly payload: {
        procedure: number[][];
        indexes: number[];
    };
}
type setIsPaused = {
    readonly type: "setIsPaused";
    readonly payload: boolean;
}
export type Actions = setIsModalOpen | setArrayForSort | setProcedureOfSorting | setIsPaused;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsModalOpen":
            return { ...state, isModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        case "setProcedureOfSorting":
            return { ...state, procedureOfSorting: actions.payload, isPaused: false };
        case "setIsPaused":
            return { ...state, isPaused: actions.payload };
        default:
            return state;
    }
}