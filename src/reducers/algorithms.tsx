import { IBubble, IQuickCharts, IQuickSnapshots } from "../components/helpers/interfaces"
import { SNAPSHOTS, BUBBLE_SORT, QUICK_SORT, MERGE_SORT } from "../components/helpers/types"

export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: IBubble;
    quickSortProcedureCharts: IQuickCharts;
    quickSortProcedureSnapshots: IQuickSnapshots;
    chosenSort: string;
    isVisualizationPaused: boolean;
    isVisualizationFinished: boolean;
    isChoseSortModalOpen: boolean;
    visualizationMethod: string;
    snapshotVisualizationMethod: string;
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
type setVisualizationMethod = {
    readonly type: "setVisualizationMethod";
    readonly payload: string;
}
type setQuickSortProcedureSnapshots = {
    readonly type: "setQuickSortProcedureSnapshots";
    readonly payload: IQuickSnapshots;
}
type setQuitVisualization = {
    readonly type: "setQuitVisualization";
}
type setSnapshotVisualizationMethod = {
    readonly type: "setSnapshotVisualizationMethod";
    readonly payload: string;
}
export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedureCharts
    | setChosenSort | setIsChoseSortModalOpen | setVisualizationMethod | setQuickSortProcedureSnapshots | setQuitVisualization | setSnapshotVisualizationMethod;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setIsTheoryModalOpen":
            return { ...state, isTheoryModalOpen: actions.payload };
        case "setArrayForSort":
            return { ...state, arrayForSort: actions.payload };
        case "setBubbleSortProcedure":
            return { ...state, bubbleSortProcedure: actions.payload, isVisualizationPaused: false, isVisualizationFinished: false };
        case "setQuickSortProcedureCharts":
            return { ...state, quickSortProcedureCharts: actions.payload, isVisualizationPaused: false, isVisualizationFinished: false };
        case "setIsPaused":
            if (actions.isVizualizationFinished !== undefined) {
                return { ...state, isVisualizationPaused: actions.isVizualizationPaused, isVisualizationFinished: actions.isVizualizationFinished };
            }
            return { ...state, isVisualizationPaused: actions.isVizualizationPaused };
        case "setChosenSort":
            return {
                ...state, bubbleSortProcedure: { indexes: [], procedure: [] },
                quickSortProcedureCharts: { pivotIndex: [], procedure: [], indexes: [] },
                chosenSort: actions.payload, isChoseSortModalOpen: false, isVisualizationFinished: true
            };
        case "setIsChoseSortModalOpen":
            return { ...state, isChoseSortModalOpen: actions.payload };
        case "setVisualizationMethod":
            if (actions.payload === SNAPSHOTS) {
                return { ...state, visualizationMethod: actions.payload, chosenSort: MERGE_SORT };
            }
            else {
                return { ...state, visualizationMethod: actions.payload, chosenSort: BUBBLE_SORT };
            }
        case "setQuickSortProcedureSnapshots":
            return { ...state, quickSortProcedureSnapshots: actions.payload, isVisualizationPaused: false, isVisualizationFinished: false };
        case "setQuitVisualization":
            if (state.chosenSort === QUICK_SORT) {
                return { ...state, isVisualizationFinished: true, isVisualizationPaused: true, quickSortProcedureSnapshots: { snapshots: [], pivotIndexes: [], snapshotPosition: { start: [], levels: [] } } }
            }
            return { ...state, isVisualizationFinished: true };
        case "setSnapshotVisualizationMethod":
            return { ...state, snapshotVisualizationMethod: actions.payload };
        default:
            return state;
    }
}