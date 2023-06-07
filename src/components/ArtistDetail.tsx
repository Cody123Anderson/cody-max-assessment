import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchArtist, fetchSimilarArtists } from "../api/api";
import { ArtistCard } from "./common/ArtistCard";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { MyListButton } from "./common/MyLIstButton";
import { Page } from "./common/Page";

export const ArtistDetail = () => {
  const {artistId} = useParams();
  const { isLoading: isLoadingArtist, data: artist } = useQuery({
    queryKey: ['fetchArtist', artistId],
    queryFn: () => fetchArtist(Number(artistId)),
  });
  const { isLoading: isLoadingSimilarArtists, data: similarArtists } = useQuery({
    queryKey: ['fetchSimilarArtists', artistId],
    queryFn: () => fetchSimilarArtists(Number(artistId)),
  });
  const primaryGenre = artist?.genres.find(genre => !!genre.is_primary);
  const additionalGenreNames = artist?.genres.reduce<string[]>((list, genre) => {
    if (primaryGenre?.id !== genre.id) {
      list.push(genre.name);
    }
    return list;
  }, []) ?? [];

  return (
    <Page>
      {isLoadingArtist && <LoadingSpinner />}
      {!isLoadingArtist && artist && 
        <>
            <div className="border shadow-md p-8 rounded-md">
                <div className="flex flex-nowrap justify-start items-center">
                  <img className="w-24 h-24 rounded-md object-cover" src={artist.image} alt={artist.name} />
                  <div className="ml-4">
                      <div className="font-bold mb-2">{artist.name}</div>
                      <div className="mb-2">Primary Genre: {primaryGenre?.name}</div>
                      <div>Popularity Score: {artist.popularity}</div>
                  </div>
                </div>
                <div className="flex flex-nowrap justify-between items-center mt-6">
                  <div>
                    <div className="mb-2">Additional Genres:</div>
                    <div>{additionalGenreNames.join(', ') || 'None'}</div>
                  </div>
                  <MyListButton {...artist} />
                </div>
            </div>
            <h2 className="mt-12 font-medium">
              Related Artists:
            </h2>
            {isLoadingSimilarArtists && <LoadingSpinner />}
            {similarArtists?.filter(a => a.id !== artist.id).map(a => <ArtistCard {...a} key={a.id} />)}
        </>
      }
    </Page>
  );
}