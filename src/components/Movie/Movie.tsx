import React, {FunctionComponent} from 'react';

import { IMovie } from "../../containers/MoviesList/MoviesList";

import "./Movie.scss";

interface IMovieProps {
    movieData: IMovie,
}

const classPrefix = "mdb-movie";

export const Movie: FunctionComponent<IMovieProps> = ({ movieData }) => {
    const {
        title
    } = movieData;

    return (
        <div className={classPrefix}>
            {title}
        </div>
    );
}
