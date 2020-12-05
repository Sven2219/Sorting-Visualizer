import { ToastAndroid } from "react-native";
import { PORTRAIT } from "./types";

export const transformInputedArray = (arrayForSort: string, orientation: string): number[] => {
    if (arrayForSort !== "") {
        const matchedElements: RegExpMatchArray | null = arrayForSort.match(/\d+/g);
        if (matchedElements !== null) {
            const transformedElements:number[] = matchedElements.map(Number);

            if (orientation === PORTRAIT) {
                if (transformedElements.length < 12) {
                    return transformedElements;
                }
                else {
                    ToastAndroid.showWithGravityAndOffset('If you want to sort more than 12 transformedElements change orientation to LANDSCAPE', ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
                }
            }
            else {
                if (transformedElements.length < 20) {
                    return transformedElements;
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(`You can't sort more than 20 transformedElements`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
                }
            }
        }
    }
    return [];
}