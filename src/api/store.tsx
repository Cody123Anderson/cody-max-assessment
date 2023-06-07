import {createContext, ReactNode, useReducer} from 'react';
import { Genre } from './api';

export enum ActionTypes {
    UpdateSearchGenre = 'UPDATE_SEARCH_GENRE',
}

type Action =
 | { type: ActionTypes.UpdateSearchGenre, payload: Genre };

type State = {
    selectedGenre?: Genre;
    myArtistIds: number[];
}

type ContextProviderValue = {
    state: State; 
    dispatch: React.Dispatch<Action>;
}

const initialState: State = {
    selectedGenre: undefined,
    myArtistIds: [],
};

const store = createContext<ContextProviderValue>({state: initialState, dispatch: () => null});
const { Provider } = store;

const reducer = (state: State, action: Action): State => {
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