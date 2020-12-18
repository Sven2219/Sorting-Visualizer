import { IBubble, IQuickCharts, IQuickSnapshots } from "../components/helpers/interfaces"
import { SNAPSHOTS, TREE, HEAP_SORT, BUBBLE_SORT, MERGE_SORT, QUICK_SORT } from "../components/helpers/types"

export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: IBubble;
    quickSortProcedureCharts: IQuickCharts;
    quickSortProcedureSnapshots: IQuickSnapshots;

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
type setQuickSortProcedureCharts = {
    readonly type: "setQuickSortProcedureCharts";
    readonly payload: IQuickCharts;
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
type setQuickSortProcedureSnapshots = {
    readonly type: "setQuickSortProcedureSnapshots";
    readonly payload: IQuickSnapshots;
}

export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedureCharts
    | setChosenSort | setIsChoseSortModalOpen | setVizualizationMethod | setQuickSortProcedureSnapshots;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsTheoryModalOpen":
            return { ...state, isTheoryModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        case "setBubbleSortProcedure":
            return { ...state, bubbleSortProcedure: actions.payload, isVizualizationPaused: false, isVizualizationFinished: false };
        case "setQuickSortProcedureCharts":
            return { ...state, quickSortProcedureCharts: actions.payload, isVizualizationPaused: false, isVizualizationFinished: false };
        case "setIsPaused":
            if (actions.isVizualizationFinished !== undefined) {
                return { ...state, isVizualizationPaused: actions.isVizualizationPaused, isVizualizationFinished: actions.isVizualizationFinished };
            }
            return { ...state, isVizualizationPaused: actions.isVizualizationPaused };
        case "setChosenSort":
            if (actions.payload === QUICK_SORT) {
                return { ...state, chosenSort: actions.payload, isChoseSortModalOpen: false, quickSortProcedureSnapshots: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], start: [] } } }
            }
            return { ...state, chosenSort: actions.payload, isChoseSortModalOpen: false };
        case "setIsChoseSortModalOpen":
            return { ...state, isChoseSortModalOpen: actions.payload };
        case "setVizualizationMethod":
            if (actions.payload === SNAPSHOTS) {
                return { ...state, vizualizationMethod: actions.payload, chosenSort: MERGE_SORT };
            }
            else if (actions.payload === TREE) {
                return { ...state, vizualizationMethod: actions.payload, chosenSort: HEAP_SORT };
            }
            else {
                return { ...state, vizualizationMethod: actions.payload, chosenSort: BUBBLE_SORT };
            }
        case "setQuickSortProcedureSnapshots":
            return { ...state, quickSortProcedureSnapshots: actions.payload, isVizualizationPaused: false, isVizualizationFinished: false };
        default:
            return state;
    }
}