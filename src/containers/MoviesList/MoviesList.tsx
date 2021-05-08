import React, {
    FunctionComponent,
    useState,
    useEffect,
} from "react";
import { RequestStatus } from "../../constants";

import "./MoviesList.scss";

const classPrefix = "mdb-movies-list";

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

    const drawMoviesList = () => {
        if (requestStatus === RequestStatus.LOADING) {
            return (<h3>Loading...</h3>);
        }

        if (requestStatus === RequestStatus.FAILED) {
            return (<h3>Failed!</h3>);
        }

        if (requestStatus === RequestStatus.SUCCESS) {
            return (<h3>Success!</h3>);
        }

        return (<h3>Idle</h3>);
    }

    return (
        <div className={classPrefix}>
            {drawMoviesList()}
        </div>
    );
};
