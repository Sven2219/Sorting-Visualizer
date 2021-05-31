import {IBubbleCharts} from '../helpers/interfaces';

export const bubbleSort = (elements: number[]): IBubbleCharts => {
  let procedure: number[][] = [];
  let indexes: number[] = [];
  let length: number = elements.length;
  procedure.push([...elements]);
  indexes.push(0);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      indexes.push(j);
      if (elements[j] > elements[j + 1]) {
        procedure.push([...elements]);
        indexes.push(j);
        let temp: number = elements[j];
        elements[j] = elements[j + 1];
        elements[j + 1] = temp;
      }
      procedure.push([...elements]);
    }
  }
  procedure.push([...elements], [...elements]);
  const payload: {procedure: number[][]; indexes: number[]} = {
    procedure,
    indexes,
  };
  return payload;
};
