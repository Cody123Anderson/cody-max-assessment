import axios from 'axios'

type Response<T> = {
    data: T;
    errors: Error[];
    sucess: 0 | 1;
}

export type Genre = {
    id: number;
    parent_id: number;
    name: string;
}

export type ArtistGenre = {
    id: number;
    name: string;
    is_primary: 0 | 1;
}

export type Artist = {
    id: number;
    image: string;
    name: string;
    popularity: number;
    genres: ArtistGenre[];
}

export const fetchGenres = (queryString: string = ''): Promise<Response<Genre[]>> => {
    return axios.get(`/genres?q=${queryString}`).then(res => res.data);
}

export const fetchArtistsByGenre = (genreId?: number): Promise<Response<Artist[]>> => {
    return axios.get(`/genres/${genreId}/artists`).then(res => res.data);
}
