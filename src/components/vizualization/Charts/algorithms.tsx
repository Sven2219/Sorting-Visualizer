import { IQuickCharts } from "../../helpers/interfaces";
import { quickSortCharts } from "../../quick/quickSort";


export const quickSortChartProcedure = (elements: number[]): IQuickCharts => {
    const quick: IQuickCharts = { procedure: [], pivotIndex:[], indexes: [] };
    const { procedure, pivotIndex, indexes } = quick;
    const high: number = elements.length - 1;

    //initial 
    procedure.push([...elements]);
    indexes.push({ index: 0 });
    pivotIndex.push(high);

    quickSortCharts(elements, 0, high, quick);

    //ending
    procedure.push([...elements]);
    procedure.push([...elements]);

    
    return quick;
}