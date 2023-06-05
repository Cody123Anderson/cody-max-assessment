import { useState } from "react";
import { Link } from "react-router-dom";

import { SearchInput } from "./common/SearchInput";

export const ArtistSearch = () => {
  const [genre, setGenre] = useState<string>('');

  const onGenreSelect = () => {

  }

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="p-8 max-w-5xl m-auto">
      <div className="text-right">
        <Link to="/my-list" className="text-blue-500 hover:underline">View My List</Link>
      </div>
      <form className="max-w-xs" onSubmit={onSearchSubmit}>
        <SearchInput
          id="artist-search"
          label="Enter a genre to find artists"
          onInputChange={(text) => setGenre(text)}
          onOptionSelect={(text) => {
            setGenre(text);
            onGenreSelect();
          }}
          searchOptions={['Rock', 'Rap', 'Hip Hop', 'Country']}
          value={genre}
        />
      </form>
    </div>
  );
}