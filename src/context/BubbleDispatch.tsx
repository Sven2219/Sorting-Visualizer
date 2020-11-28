import { createContext } from 'react';
import { Actions } from '../reducers/bubbleSort';
interface IContextProps {
    dispatch: React.Dispatch<Actions>;
}
export const BubbleDispatch = createContext({} as IContextProps);