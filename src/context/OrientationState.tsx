import { createContext } from 'react';
interface IContextProps {
    orientation: string;
}
export const OrientationState = createContext({} as IContextProps);