import React, {FunctionComponent} from 'react';

import { IMovie } from "../../containers/MoviesList/MoviesList";

interface IMovieProps {
    movieData: IMovie,
}

export const Movie: FunctionComponent<IMovieProps> = ({ movieData }) => {
    const {
        title
    } = movieData;

    return (
        <div>
            {title}
        </div>
    );
}
