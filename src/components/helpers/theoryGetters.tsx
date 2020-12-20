import { CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE, CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT, CODE_EXAMPLE_LEFT_LANDSCAPE, CODE_EXAMPLE_LEFT_PORTRAIT } from "./Constants";
import { PORTRAIT } from "./types";

export const getCodeExampleContainerWidth = (orientation: string): number => {
    return orientation === PORTRAIT ? CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT : CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE;
}
export const getCodeExampleLeftPosition = (orientation: string): number => {
    return orientation === PORTRAIT ? CODE_EXAMPLE_LEFT_PORTRAIT : CODE_EXAMPLE_LEFT_LANDSCAPE;
}
