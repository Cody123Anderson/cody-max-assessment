import { Link } from "react-router-dom";
import { Artist } from "../../api/api"
import { Button } from "./Button";

type Props = Artist;

export const ArtistCard = ({id, name, image, genres}: Props) => {
    return (
        <div className="border shadow-md px-4 py-8 mt-4 rounded-md flex flex-nowrap justify-between items-center">
            <img className="w-20 h-20 rounded-md object-cover" src={image} alt={name} />
            <div className="text-center">
                <Link to={`/artists/${id}`} className="hover:text-gray-500 font-bold">{name}</Link>
                <div>{genres.find(genre => !!genre.is_primary)?.name}</div>
            </div>
            <Button>Add</Button>
        </div>
    )
}