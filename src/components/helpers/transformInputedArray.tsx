import { ToastAndroid } from "react-native";
import { IMerge } from "./interfaces";
import { CHARTS, LANDSCAPE, PORTRAIT } from "./types";

const isLengthValid = (length: number, orientation: string, visualizationMethod: string): boolean => {
    if (orientation === PORTRAIT && visualizationMethod === CHARTS) {
        if (length < 10) {
            return true;
        }
        chartsPortraitErrorMessage(10);
        return false;
    }
    else if (orientation === LANDSCAPE && visualizationMethod === CHARTS) {
        if (length < 20) {
            return true;
        }
        chartsLandscapeErrorMessage(20);
        return false;
    }
    else {
        if (length > 9) {
            qsSnapshotsErrorMessage(9);
            return false;
        }
        return true;
    }
}
const qsSnapshotsErrorMessage = (numberOfElements: number): void => {
    ToastAndroid.showWithGravityAndOffset(`You can't sort more than ${numberOfElements} elements`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}
const chartsPortraitErrorMessage = (numberOfElements: number): void => {
    ToastAndroid.showWithGravityAndOffset(`If you want to sort more than ${numberOfElements} elements change orientation to LANDSCAPE`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}
const chartsLandscapeErrorMessage = (numberOfElements: number): void => {
    ToastAndroid.showWithGravityAndOffset(`You can't sort more than ${numberOfElements} elements`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}
const msSnapshotsErrorMessage = (low: number, high: number): void => {
    ToastAndroid.showWithGravityAndOffset(`In this orientation you can only sort arrays of length between ${low}-${high}`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}
export const transfromTextToArray = (arrayForSort: string, orientation: string, visualizationMethod: string): number[] => {
    if (arrayForSort !== "") {
        const matchedElements: RegExpMatchArray | null = arrayForSort.match(/\d+/g);//matching only numbers
        if (matchedElements !== null) {
            const transformedElements: number[] = matchedElements.map(Number);//transforming into array of numbers
            const isValid: boolean = isLengthValid(transformedElements.length, orientation, visualizationMethod);
            if (isValid) {
                return transformedElements;
            }
            return [];
        }
    }
    return [];
}
//Transformation into an object because we want to have access to the original indexes while the merge sort is executed

const isMergeLengthValid = (length: number, orientation: string) => {
    if (orientation === PORTRAIT) {
        if (length >= 4 && length <= 5) {
            return true;
        }
        msSnapshotsErrorMessage(4, 5);
        return false;
    }
    else {
        if (length >= 4 && length <= 7) {
            return true;
        }
        msSnapshotsErrorMessage(4, 7);
        return false;
    }
}
export const transformToObject = (arrayForSort: string, orientation: string): IMerge[] => {
    const matchedElements: RegExpMatchArray | null = arrayForSort.match(/\d+/g);//matching only numbers
    let transformedElements: IMerge[] = []
    if (matchedElements !== null) {
        transformedElements = matchedElements.map((element, index) => {
            return { element: Number(element), index }
        })
        const isValid:boolean = isMergeLengthValid(Object.keys(transformedElements).length, orientation);
        if (isValid) {
            return transformedElements;
        }
        return [];
    }
    return [];
}