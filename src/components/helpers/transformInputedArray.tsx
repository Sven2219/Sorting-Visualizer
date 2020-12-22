import { ToastAndroid } from "react-native";
import { IMerge } from "./interfaces";
import { CHARTS, PORTRAIT } from "./types";

const isLengthValid = (length: number, orientation: string, visualizationMethod: string): boolean => {
    if (orientation === PORTRAIT) {
        if (visualizationMethod === CHARTS) {
            if (length < 12) {
                return true;
            }
            toastErrorMessagePortrait(12);
            return false;
        }
        else {
            if (length < 9) {
                return true;
            }
            toastErrorMessagePortrait(9);
            return false;
        }
    }
    else {
        if (visualizationMethod === CHARTS) {
            if (length < 20) {
                return true;
            }
            toastErrorMessageLandscape(20);
            return false;
        }
        else {
            if (length < 14) {
                return true;
            }
            toastErrorMessageLandscape(14);
            return false;
        }
    }
}
const toastErrorMessagePortrait = (numberOfElements: number): void => {
    ToastAndroid.showWithGravityAndOffset(`If you want to sort more than ${numberOfElements} elements change orientation to LANDSCAPE`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}
const toastErrorMessageLandscape = (numberOfElements: number): void => {
    ToastAndroid.showWithGravityAndOffset(`You can't sort more than ${numberOfElements} elements`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
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
export const transformToObject = (arrayForSort: string): IMerge[] => {
    const matchedElements: RegExpMatchArray | null = arrayForSort.match(/\d+/g);//matching only numbers
    let transformedElements: IMerge[] = []
    if (matchedElements !== null) {
        transformedElements = matchedElements.map((element, index) => {
            return { element: Number(element), index }
        })
    }
    return transformedElements;
}