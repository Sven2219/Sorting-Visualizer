import { IBubble, IQuickCharts, IQuickSnapshots } from "../components/helpers/interfaces"
import { SNAPSHOTS, BUBBLE_SORT, QUICK_SORT, MERGE_SORT } from "../components/helpers/types"

export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: IBubble;
    quickSortProcedureCharts: IQuickCharts;
    quickSortSnapshotsProcedure: IQuickSnapshots;
    sortingAlgorithm: string;
    isVisualizationPaused: boolean;
    isVisualizationFinished: boolean;
    isMenuModalOpen: boolean;
    visualizationMethod: string;//SNAPSHOT OR CHARTS
    snapshotDisplayMethod: string;//TIMING OR MANUAL
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
type setSortingAlgoritm = {
    readonly type: "setSortingAlgorithm";
    readonly payload: string;
}
type setIsMenuModalOpen = {
    readonly type: "setIsMenuModalOpen";
    readonly payload: boolean;
}
type setVisualizationMethod = {
    readonly type: "setVisualizationMethod";
    readonly payload: string;
}
type setQuickSortSnapshotsProcedure = {
    readonly type: "setQuickSortSnapshotsProcedure";
    readonly payload: IQuickSnapshots;
}
type setQuitVisualization = {
    readonly type: "setQuitVisualization";
}
type setSnapshotDisplayMethod = {
    readonly type: "setSnapshotDisplayMethod";
    readonly payload: string;
}
export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedureCharts
    | setSortingAlgoritm | setIsMenuModalOpen | setVisualizationMethod | setQuickSortSnapshotsProcedure | setQuitVisualization
    | setSnapshotDisplayMethod;

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
        case "setSortingAlgorithm":
            return {
                ...state, bubbleSortProcedure: { indexes: [], procedure: [] },
                quickSortProcedureCharts: { pivotIndexes: [], procedure: [], indexes: [] },
                sortingAlgorithm: actions.payload, isMenuModalOpen: false, isVisualizationFinished: true
            };
        case "setIsMenuModalOpen":
            return { ...state, isMenuModalOpen: actions.payload };
        case "setVisualizationMethod":
            if (actions.payload === SNAPSHOTS) {
                return { ...state, visualizationMethod: actions.payload, sortingAlgorithm: MERGE_SORT };
            }
            else {
                return { ...state, visualizationMethod: actions.payload, sortingAlgorithm: BUBBLE_SORT };
            }
        case "setQuickSortSnapshotsProcedure":
            return { ...state, quickSortSnapshotsProcedure: actions.payload, isVisualizationPaused: false, isVisualizationFinished: false };
        case "setQuitVisualization":
            if (state.sortingAlgorithm === QUICK_SORT) {
                return { ...state, isVisualizationFinished: true, isVisualizationPaused: true, quickSortSnapshotsProcedure: { snapshots: [], pivotIndexes: [], snapshotPosition: { startIndexes: [], levels: [] } } }
            }
            return { ...state, isVisualizationFinished: true };
        case "setSnapshotDisplayMethod":
            return { ...state, snapshotDisplayMethod: actions.payload, quickSortSnapshotsProcedure: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], startIndexes: [] } } };
        default:
            return state;
    }
}