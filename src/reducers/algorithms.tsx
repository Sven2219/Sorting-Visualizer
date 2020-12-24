import { IBubble, IMergeSnapshots, IQuickCharts, IQuickSnapshots } from "../components/helpers/interfaces"
import { SNAPSHOTS, BUBBLE_SORT, QUICK_SORT, MERGE_SORT } from "../components/helpers/types"

export interface IState {
    isTheoryModalOpen: boolean;
    arrayForSort: string;
    bubbleSortProcedure: IBubble;
    quickSortProcedureCharts: IQuickCharts;
    quickSortSnapshotsProcedure: IQuickSnapshots;
    mergeSortSnapshotsProcedure: IMergeSnapshots;
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
    readonly isVisualizationPaused: boolean;
    readonly isVisualizationFinished?: boolean;
}
type setQuickSortProcedureCharts = {
    readonly type: "setQuickSortProcedureCharts";
    readonly payload: IQuickCharts;
}
type setMergeSortSnapshotsProcedure = {
    readonly type: "setMergeSortSnapshotsProcedure";
    readonly payload: IMergeSnapshots;
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
type invalidOrientation = {
    readonly type: "invalidOrientation";
    readonly resetBubble?: boolean;
    readonly resetQuickCharts?: boolean;
    readonly resetQuickSnapshots?: boolean;
    readonly resetMerge?: boolean;
}
export type Actions = setIsTheoryModalOpen | setArrayForSort | setBubbleSortProcedure | setIsPaused | setQuickSortProcedureCharts
    | setSortingAlgoritm | setIsMenuModalOpen | setVisualizationMethod | setQuickSortSnapshotsProcedure | setQuitVisualization
    | setSnapshotDisplayMethod | setMergeSortSnapshotsProcedure | invalidOrientation;

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
            if (actions.isVisualizationFinished !== undefined) {
                return { ...state, isVisualizationPaused: actions.isVisualizationPaused, isVisualizationFinished: actions.isVisualizationFinished };
            }
            return { ...state, isVisualizationPaused: actions.isVisualizationPaused };
        case "setSortingAlgorithm":
            return {
                ...state, bubbleSortProcedure: { indexes: [], procedure: [] },
                quickSortProcedureCharts: { pivotIndexes: [], procedure: [], indexes: [] },
                sortingAlgorithm: actions.payload, isMenuModalOpen: false, isVisualizationFinished: true
            };
        case "setIsMenuModalOpen":
            if (state.sortingAlgorithm === BUBBLE_SORT) {
                return { ...state, isMenuModalOpen: actions.payload, bubbleSortProcedure: { procedure: [], indexes: [] } };
            }
            else if (state.sortingAlgorithm === QUICK_SORT) {
                return { ...state, isMenuModalOpen: actions.payload, quickSortProcedureCharts: { pivotIndexes: [], procedure: [], indexes: [] } }
            }
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
            else if (state.sortingAlgorithm === BUBBLE_SORT) {
                return { ...state, isVisualizationFinished: true, isVisualizationPaused: true, bubbleSortProcedure: { procedure: [], indexes: [] } };
            }
            return { ...state, isVisualizationFinished: true, isVisualizationPaused: true, mergeSortSnapshotsProcedure: { snapshots: [], levels: [] } };
        case "setSnapshotDisplayMethod":
            if (state.sortingAlgorithm === QUICK_SORT) {
                return { ...state, snapshotDisplayMethod: actions.payload, quickSortSnapshotsProcedure: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], startIndexes: [] } } };
            }
            else {
                return { ...state, snapshotDisplayMethod: actions.payload, mergeSortSnapshotsProcedure: { levels: [], snapshots: [] } };
            }
        case "setMergeSortSnapshotsProcedure":
            return { ...state, mergeSortSnapshotsProcedure: actions.payload, isVisualizationPaused: false, isVisualizationFinished: false };
        case "invalidOrientation":
            if (actions.resetBubble !== undefined) {
                return { ...state, bubbleSortProcedure: { procedure: [], indexes: [] }, isVisualizationFinished: true, isVisualizationPaused: true };
            }
            else if (actions.resetQuickCharts !== undefined) {
                return { ...state, quickSortProcedureCharts: { procedure: [], pivotIndexes: [], indexes: [] }, isVisualizationPaused: true, isVisualizationFinished: true };
            }
            else if (actions.resetQuickSnapshots !== undefined) {
                return { ...state, quickSortSnapshotsProcedure: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], startIndexes: [] } }, isVisualizationFinished: true, isVisualizationPaused: true };
            }
            else if (actions.resetMerge !== undefined) {
                return { ...state, mergeSortSnapshotsProcedure: { snapshots: [], levels: [] }, isVisualizationPaused: true, isVisualizationFinished: true };
            }
        default:
            return state;
    }
}