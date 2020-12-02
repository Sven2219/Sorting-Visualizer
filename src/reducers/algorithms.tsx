export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: {
        procedure: number[][];
        indexes: number[];
    };
    quickSortProcedure: {
        procedure: number[][];
        indexes: number[];
        pivots: number[]
    }
    chosenSort: string;
    isVizualizationPaused: boolean;
    isVizualizationFinished: boolean;
    isChoseSortModalOpen: boolean;
}
type setIsTheoryModalOpen = {
    readonly type: "setIsTheoryModalOpen";
    readonly payload: boolean;
}
type setArrayForSort = {
    readonly type: "setArrayForSort";
    readonly payload: string;
}
type setBubbleSortProcedure = {
    readonly type: "setBubbleSortProcedure";
    readonly payload: {
        procedure: number[][];
        indexes: number[];
    };
}
type setIsPaused = {
    readonly type: "setIsPaused";
    readonly isVizualizationPaused: boolean;
    readonly isVizualizationFinished?: boolean;
}
type setQuickSortProcedure = {
    readonly type: "setQuickSortProcedure";
    readonly payload: {
        procedure: number[][];
        indexes: number[];
        pivots: number[];
    }
}
type setChosenSort = {
    readonly type: "setChosenSort";
    readonly payload: string;
}
type setIsChoseSortModalOpen = {
    readonly type: "setIsChoseSortModalOpen";
    readonly payload: boolean;
}
export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedure
    | setChosenSort | setIsChoseSortModalOpen;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsTheoryModalOpen":
            return { ...state, isTheoryModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        case "setBubbleSortProcedure":
            return { ...state, bubbleSortProcedure: actions.payload, isVizualizationPaused: false, isVizualizationFinished: false };
        case "setQuickSortProcedure":
            return { ...state, quickSortProcedure: actions.payload, isVizualizationPaused: false, isVizualizationFinished: false };
        case "setIsPaused":
            if (actions.isVizualizationFinished !== undefined) {
                return { ...state, isVizualizationPaused: actions.isVizualizationPaused, isVizualizationFinished: actions.isVizualizationFinished };
            }
            return { ...state, isVizualizationPaused: actions.isVizualizationPaused };
        case "setChosenSort":
            return { ...state, chosenSort: actions.payload, isChoseSortModalOpen: false };
        case "setIsChoseSortModalOpen":
            return { ...state, isChoseSortModalOpen: actions.payload };
        default:
            return state;
    }
}