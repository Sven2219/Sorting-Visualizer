import { createContext } from 'react';
import { Actions } from '../reducers/algorithms';
interface IContextProps {
    dispatch: React.Dispatch<Actions>;
}
export const AlgorithmsDispatch = createContext({} as IContextProps);