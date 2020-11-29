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
export const MARGIN_LEFT_PORTRAIT = (portraitWidth - INPUT_ARRAY_WIDTH_PORTRAIT) / 2;
export const MARGIN_LEFT_LANDSCAPE = (portraitHeight - INPUT_ARRAY_WIDTH_LANDSCAPE) / 2;
export const CHART_MIN_HEIGHT = portraitHeight / 10;
export const CHART_MAX_HEIGHT = portraitHeight / 4;
export const CHARTS_HEIGHT = portraitWidth * 0.6;
export const CODE_EXAMPLE_CONTAINER_WIDTH = portraitWidth * 0.9;