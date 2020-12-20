import { IBubble } from "../helpers/interfaces";

export const bubbleSort = (elements: number[]): IBubble => {
    let procedure: number[][] = [];
    let indexes: number[] = [];
    let length: number = elements.length;
    //start scenario 
    procedure.push([...elements]);
    indexes.push(0);
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
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
    //end scenario 
    //To display the last sorting step, I need to push it into the field twice, because I am working with timer.
    procedure.push([...elements]);
    procedure.push([...elements]);
    const payload: { procedure: number[][], indexes: number[] } = { procedure, indexes };
    return payload;
}
