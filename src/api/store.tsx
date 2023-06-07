import {createContext, ReactNode, useReducer} from 'react';
import { Artist, Genre } from './api';

export enum ActionTypes {
    AddArtist = 'ADD_ARTIST',
    RemoveArtist = 'REMOVE_ARTIST',
    UpdateSearchGenre = 'UPDATE_SEARCH_GENRE',
}

type Action =
 | { type: ActionTypes.AddArtist, payload: Artist }
 | { type: ActionTypes.RemoveArtist, payload: number }
 | { type: ActionTypes.UpdateSearchGenre, payload: Genre };

type State = {
    selectedGenre?: Genre;
    myArtists: Artist[];
}

type ContextProviderValue = {
    state: State; 
    dispatch: React.Dispatch<Action>;
}

enum LocalStorageKeys {
    MyArtists = 'myArtists',
}

const initialState: State = {
    selectedGenre: undefined,
    myArtists: JSON.parse(localStorage.getItem(LocalStorageKeys.MyArtists) ?? JSON.stringify([])),
};

const store = createContext<ContextProviderValue>({state: initialState, dispatch: () => null});
const { Provider } = store;

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case ActionTypes.AddArtist: {
            const newArtists = [action.payload, ...state.myArtists];
            
            // persist to local storage
            localStorage.setItem(LocalStorageKeys.MyArtists, JSON.stringify(newArtists));
            
            return {...state, myArtists: newArtists};
        }
        case ActionTypes.RemoveArtist: {
            const newArtists = state.myArtists.filter(({id}) => id !== action.payload);
            
            // persist to local storage
            localStorage.setItem(LocalStorageKeys.MyArtists, JSON.stringify(newArtists));
            
            return {...state, myArtists: newArtists};
        }
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