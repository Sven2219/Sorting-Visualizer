import { IBubble } from "../components/bubble/bubbleSort"
import { IQuick } from "../components/quick/quickSort"

export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: IBubble;
    quickSortProcedure: IQuick;
    chosenSort: string;
    isVizualizationPaused: boolean;
    isVizualizationFinished: boolean;
    isChoseSortModalOpen: boolean;
    vizualizationMethod: string;
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
    readonly payload: IBubble;
}
type setIsPaused = {
    readonly type: "setIsPaused";
    readonly isVizualizationPaused: boolean;
    readonly isVizualizationFinished?: boolean;
}
type setQuickSortProcedure = {
    readonly type: "setQuickSortProcedure";
    readonly payload: IQuick;
}

type setChosenSort = {
    readonly type: "setChosenSort";
    readonly payload: string;
}
type setIsChoseSortModalOpen = {
    readonly type: "setIsChoseSortModalOpen";
    readonly payload: boolean;
}
type setVizualizationMethod = {
    readonly type: "setVizualizationMethod";
    readonly payload: string;
}
export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedure
    | setChosenSort | setIsChoseSortModalOpen | setVizualizationMethod;

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
        case "setVizualizationMethod":
            return { ...state, vizualizationMethod: actions.payload };
        default:
            return state;
    }
}