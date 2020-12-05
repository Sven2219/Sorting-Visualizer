import { MODAL_OVERLAY_PORTRAIT, MODAL_OVERLAY_LANDSCAPE, ALGO_MENU_ITEM_WIDTH_LANDSCAPE, ALGO_MENU_ITEM_WIDTH_PORTRAIT } from '../Constants';
import { PORTRAIT } from '../helpers/types';
export const getModalWidth = (orientation: string): number => {
    return orientation === PORTRAIT ? MODAL_OVERLAY_PORTRAIT : MODAL_OVERLAY_LANDSCAPE;
}
export const getModalHeight = (orientation: string): number => {
    return orientation === PORTRAIT ? MODAL_OVERLAY_LANDSCAPE : MODAL_OVERLAY_PORTRAIT;
}
export const getItemWidth = (orientation: string): number => {
    return orientation === PORTRAIT ? ALGO_MENU_ITEM_WIDTH_PORTRAIT : ALGO_MENU_ITEM_WIDTH_LANDSCAPE;
}
export const getItemHeight = (orientation: string): number => {
    return orientation === PORTRAIT ? ALGO_MENU_ITEM_WIDTH_LANDSCAPE : ALGO_MENU_ITEM_WIDTH_PORTRAIT;
}
export const getBackgroundColor = (title: string, chosenTitle: string): string => {
    return title === chosenTitle ? "rgba(34,139,34,0.6)" : "#fff"
}