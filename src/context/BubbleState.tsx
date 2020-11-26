import { createContext } from 'react';
import { IState } from '../reducers/bubbleSort';
interface IContextProps {
    state: IState;
}
export const BubbleState = createContext({} as IContextProps);