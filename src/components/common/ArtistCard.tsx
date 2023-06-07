import { Link } from "react-router-dom";

import { Artist } from "../../api/api"
import { MyListButton } from "./MyLIstButton";

type Props = Artist;

export const ArtistCard = (artist: Props) => {
    return (
        <div className="border shadow-md p-8 mt-4 rounded-md flex flex-nowrap justify-between items-center">
            <img className="w-20 h-20 rounded-md object-cover" src={artist.image} alt={artist.name} />
            <div className="text-center">
                <Link to={`/artists/${artist.id}`} className="hover:text-gray-500 font-bold">{artist.name}</Link>
                <div>{artist.genres.find(genre => !!genre.is_primary)?.name}</div>
            </div>
            <MyListButton {...artist} />
        </div>
    )
}