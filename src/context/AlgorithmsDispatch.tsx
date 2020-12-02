import { createContext } from 'react';
import { Actions } from '../reducers/algorithms';
interface IContextProps {
    dispatch: React.Dispatch<Actions>;
}
export const AlgoritmhsDispatch = createContext({} as IContextProps);