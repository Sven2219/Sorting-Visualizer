
export interface IState {
    isModalOpen: boolean;
    arrayForSort: string;
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
    };
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
export type Actions = setIsModalOpen | setArrayForSort | setProcedureOfSorting;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsModalOpen":
            return { ...state, isModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        case "setProcedureOfSorting":
            return { ...state, procedureOfSorting: actions.payload };

        default:
            return state;
    }
}