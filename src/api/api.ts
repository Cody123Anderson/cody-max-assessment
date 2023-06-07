import axios from 'axios'

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

export const fetchGenres = (queryString: string = ''): Promise<Genre[]> => {
    return axios.get(`/genres?q=${queryString}`).then(res => res.data.data);
}

export const fetchArtistsByGenre = (id?: number): Promise<Artist[]> => {
    return axios.get(`/genres/${id}/artists`).then(res => res.data.data);
}

export const fetchArtist = (id: number): Promise<Artist> => {
    return axios.get(`/artists/${id}`).then(res => res.data.data[0]);
}

export const fetchSimilarArtists = (id: number): Promise<Artist[]> => {
    return axios.get(`/artists/${id}/similar`).then(res => res.data.data);
}
