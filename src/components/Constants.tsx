import { Dimensions } from 'react-native';
//Test purposes
//Portrait
//width = 360
//height = 592
//Landscape obrnuto

export const { width, height } = Dimensions.get("window");

const portraitWidth = width > height ? height : width;
const portraitHeight = height < width ? width : height;
export const INPUT_ARRAY_WIDTH_PORTRAIT = portraitWidth * 0.8;
export const INPUT_ARRAY_WIDTH_LANDSCAPE = portraitHeight * 0.8;
export const MODAL_OVERLAY_PORTRAIT = portraitWidth;
export const MODAL_OVERLAY_LANDSCAPE = portraitHeight;


export const ALGO_MENU_ITEM_WIDTH_PORTRAIT = portraitWidth / 1.4;
export const ALGO_MENU_ITEM_WIDTH_LANDSCAPE = portraitHeight / 1.4;
export const MARGIN_LEFT_PORTRAIT = (portraitWidth - INPUT_ARRAY_WIDTH_PORTRAIT) / 2;
export const MARGIN_LEFT_LANDSCAPE = (portraitHeight - INPUT_ARRAY_WIDTH_LANDSCAPE) / 2;
export const CHART_MIN_HEIGHT = portraitHeight / 10;
export const CHART_MAX_HEIGHT = portraitHeight / 4;
export const CHARTS_HEIGHT = portraitWidth * 0.6;
export const CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT = portraitWidth * 0.9;
export const CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE = portraitHeight * 0.9;
export const CODE_EXAMPLE_LEFT_PORTRAIT = (portraitWidth - CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT)/8;
export const CODE_EXAMPLE_LEFT_LANDSCAPE = (portraitHeight - CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE)/8;