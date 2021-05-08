import React, {
    FunctionComponent,
    useState,
    useEffect,
} from "react";
import { RequestStatus } from "../../constants";

import { Movie } from "../../components/Movie/Movie";

import "./MoviesList.scss";

const classPrefix = "mdb-movies-list";

const API_KEY = "01bfc5e83ec9b72845761f48aec9715a";

export interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string, // "en" || ...
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
};

export const MoviesList: FunctionComponent = () => {
    const [requestStatus, setRequestStatus] = useState(RequestStatus.IDLE);
    const [movies, setMovies] = useState<Array<IMovie>>([]);
    const [nameQuery, setNameQuery] = useState<string>("top+gun");
    const [page, setPage] = useState<number>(1);

    const drawMoviesList = () => {
        if (requestStatus === RequestStatus.LOADING) {
            return (<h3>Loading...</h3>);
        }

        if (requestStatus === RequestStatus.FAILED) {
            return (<h3>Failed!</h3>);
        }

        if (requestStatus === RequestStatus.SUCCESS) {
            // TODO check for no results

            return (
                <ul>
                    {movies.length > 0 && movies.map((movieData) => (
                        <li key={movieData.id}>
                            <Movie movieData={movieData} />
                        </li>
                    ))}
                </ul>
            );
        }

        return (<h3>Idle</h3>);
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${nameQuery}&page=${page}&include_adult=false`)
            .then((resp) => {
                return resp.json();
            })
            .then((respJson) => {
                setMovies(respJson.results);
                console.log(respJson);
                setRequestStatus(RequestStatus.SUCCESS);
            })
            .catch(() => {
                setRequestStatus(RequestStatus.FAILED);
            });
    }, []);

    return (
        <div className={classPrefix}>
            {drawMoviesList()}
        </div>
    );
};
