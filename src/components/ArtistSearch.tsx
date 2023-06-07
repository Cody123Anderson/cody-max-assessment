import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { fetchArtistsByGenre, fetchGenres } from "../api/api";
import { ActionTypes, store } from "../api/store";
import { ArtistCard } from "./common/ArtistCard";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { Page } from "./common/Page";
import { SearchInput } from "./common/SearchInput";

export const ArtistSearch = () => {
  const {state: {selectedGenre}, dispatch} = useContext(store);
  const [genreSearchText, setGenreSearchText] = useState<string>(selectedGenre?.name || '');

  const { isLoading: isLoadingGenres, data: genres } = useQuery({
    queryKey: ['fetchGenres'],
    queryFn: () => fetchGenres(),
  });

  const { isLoading: isLoadingArtists, data: artists } = useQuery({
    queryKey: ['fetchArtistsByGenre', selectedGenre?.id],
    queryFn: () => fetchArtistsByGenre(selectedGenre?.id),
    enabled: !!selectedGenre?.id,
  });

  const filteredGenres = genres?.filter(genre => genre.name.includes(genreSearchText));

  return (
    <Page showBackButton={false}>
      <form className="max-w-xs" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <SearchInput
          id="artist-search"
          label="Enter a genre to find artists"
          onChange={(text) => setGenreSearchText(text)}
          onOptionSelect={selectedGenre => {
            setGenreSearchText(selectedGenre.name);
            dispatch({type: ActionTypes.UpdateSearchGenre, payload: selectedGenre});
          }}
          searchOptions={filteredGenres}
          value={genreSearchText}
        />
      </form>
      {(isLoadingGenres || (isLoadingArtists && selectedGenre?.id)) && <LoadingSpinner className="mt-12" />}
      {!isLoadingArtists && selectedGenre?.id && 
        <>
          <h3 className="mt-12 mb-8 font-bold">{selectedGenre.name} Artists</h3>
          {artists?.map(artist => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </>
      }      
    </Page>
  );
}