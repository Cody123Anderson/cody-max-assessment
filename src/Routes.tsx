import {Route, Routes as RRDRoutes} from "react-router-dom";

import { ArtistDetail } from "./components/ArtistDetail";
import {ArtistSearch} from './components/ArtistSearch';
import {MyList} from "./components/MyList";

export const Routes = () => {
    return (
        <RRDRoutes>
            <Route path='/' element={<ArtistSearch />} />
            <Route path='/artists/:artistId' element={<ArtistDetail />} />
            <Route path='/my-list' element={<MyList />} />
            <Route path='*' element={<div>404</div>} />
        </RRDRoutes>
    );
};