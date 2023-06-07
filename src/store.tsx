import {createContext, ReactNode, useReducer} from 'react';
import { Genre } from './api/api';

export enum ActionTypes {
    UpdateSearchGenre = 'UPDATE_SEARCH_GENRE',
}

type Action =
 | { type: ActionTypes.UpdateSearchGenre, payload: Genre | undefined };

type State = {
    selectedGenre?: Genre;
}

type ContextProviderValue = {
    state: State; 
    dispatch: React.Dispatch<Action>;
}

const initialState = {
    selectedGenre: undefined,
};

const store = createContext<ContextProviderValue>({state: initialState, dispatch: () => null});
const { Provider } = store;

const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case ActionTypes.UpdateSearchGenre:
            return {...state, selectedGenre: action.payload};
        default:
            throw new Error();
    };
};

const StateProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export { store, StateProvider }