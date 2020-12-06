import { IBubble } from "../helpers/interfaces";

export const bubbleSort = (items: number[]): IBubble => {
    let procedure: number[][] = [];
    let indexes: number[] = [];
    let length: number = items.length;
    procedure.push([...items]);
    indexes.push(0);
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            indexes.push(j);
            if (items[j] > items[j + 1]) {
                procedure.push([...items]);
                indexes.push(j);
                let temp: number = items[j];
                items[j] = items[j + 1];
                items[j + 1] = temp;
            }
            procedure.push([...items]);
        }
    }
    procedure.push([...items]);
    procedure.push([...items]);
    const payload: { procedure: number[][], indexes: number[] } = { procedure, indexes };
    return payload;
}