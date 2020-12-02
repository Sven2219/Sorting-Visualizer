import { createContext } from 'react';
import { IState } from '../reducers/algorithms';
interface IContextProps {
    state: IState;
}
export const AlgorithmsState = createContext({} as IContextProps);