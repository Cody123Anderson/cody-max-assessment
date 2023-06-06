import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import { fetchArtistsByGenre, fetchGenres, Genre } from "../api/api";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { SearchInput } from "./common/SearchInput";

export const ArtistSearch = () => {
  const [genreSearchText, setGenreSearchText] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  const { isLoading: isLoadingGenres, data: genreData } = useQuery({
    queryKey: ['fetchGenres'],
    queryFn: () => fetchGenres(),
  });

  const { isLoading: isLoadingArtists, data: artistData } = useQuery({
    queryKey: ['fetchArtistsByGenre', selectedGenre?.id],
    queryFn: () => fetchArtistsByGenre(selectedGenre?.id),
    enabled: !!selectedGenre?.id,
  });

  const filteredGenres = genreData?.data?.filter(genre => genre.name.includes(genreSearchText));

  return (
    <div className="p-8 max-w-5xl m-auto">
      <div className="text-right">
        <Link to="/my-list" className="text-blue-500 hover:underline">View My List</Link>
      </div>
      <form className="max-w-xs" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <SearchInput
          id="artist-search"
          label="Enter a genre to find artists"
          onInputChange={(text) => setGenreSearchText(text)}
          onOptionSelect={selectedGenre => {
            setGenreSearchText(selectedGenre.name);
            setSelectedGenre(selectedGenre);
          }}
          searchOptions={filteredGenres}
          value={genreSearchText}
        />
      </form>
      {(isLoadingGenres || (isLoadingArtists && selectedGenre?.id)) && <LoadingSpinner className="mt-12" />}
      {!isLoadingArtists && selectedGenre?.id && artistData?.data?.map(artist => (
          <div key={artist.id}>{artist.name}</div>
      ))}      
    </div>
  );
}