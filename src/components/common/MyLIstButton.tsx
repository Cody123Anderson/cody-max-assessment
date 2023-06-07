import { useContext } from "react";
import { Artist } from "../../api/api";
import { ActionTypes, store } from "../../api/store";
import { Button } from "./Button";

type Props = Artist;

export const MyListButton = (artist: Props) => {
    const {state: {myArtists}, dispatch} = useContext(store);
    const isInMyArtists = myArtists.some(a => a.id === artist.id);

    const onClick = () => {
        if (isInMyArtists) {
            dispatch({type: ActionTypes.RemoveArtist, payload: artist.id});
        } else {
            dispatch({type: ActionTypes.AddArtist, payload: artist});
        }
    };

    return (
        <Button onClick={onClick}>
            {isInMyArtists ? 'Remove' : 'Add'}
        </Button>
    );
};