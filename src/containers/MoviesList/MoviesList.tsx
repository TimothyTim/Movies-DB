import React, {
    FunctionComponent,
    useState,
    useEffect,
} from "react";
import {
    useHistory
} from "react-router-dom";
import { RequestStatus } from "../../constants";
import { useQuery } from "../../hooks/useQuery";
import qs from 'query-string';

import { Movie } from "../../components/Movie/Movie";
import { Pagination } from "../../components/Pagination/Pagination";
import { API_KEY } from "../../../env.config";

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
    const history = useHistory();
    const [requestStatus, setRequestStatus] = useState(RequestStatus.IDLE);
    const [movies, setMovies] = useState<Array<IMovie>>([]);
    const query = useQuery();
    const {s = "", page = 1} = query;

    const showPagination = !!s?.length && !!movies?.length;

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
                        <li key={movieData.id} data-testid="movie-element">
                            <Movie movieData={movieData} />
                        </li>
                    ))}
                </ul>
            );
        }

        return (<h3>No Movies Listed</h3>);
    }

    const changeSearchInput = (e) => {
        const { currentTarget } = e;

        setPage(1);

        history.push({
            search: qs.stringify(Object.assign(query, {
                s: currentTarget.value,
            }))
        });
    }

    const setPage = (newPage) => {
        history.push({
            search: qs.stringify(Object.assign(query, {
                page: newPage
            }))
        });
    }

    useEffect(() => {
        if (!s?.length) {
            return;
        }

        let isCancelled = false;
        setRequestStatus(RequestStatus.LOADING);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${s}&page=${page}&include_adult=false`)
            .then((resp) => {
                return resp.json();
            })
            .then((respJson) => {
                if (!isCancelled) {
                    setRequestStatus(RequestStatus.SUCCESS);
                    setMovies(respJson.results);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setRequestStatus(RequestStatus.FAILED);
                }
            });

        return () => {
            setRequestStatus(RequestStatus.IDLE);
            isCancelled = true;
        };
    }, [s, page]);

    return (
        <div className={classPrefix}>
            <input
                className={`${classPrefix}__search`}
                data-testid="search"
                placeholder="Search Movies"
                defaultValue={s as string}
                onChange={changeSearchInput}
            />
            {drawMoviesList()}
            {showPagination && <Pagination setPage={setPage} page={Number(page)} />}
        </div>
    );
};
