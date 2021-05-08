import React, { FunctionComponent } from "react";

import { MoviesList } from "./containers/MoviesList/MoviesList";
import { Container } from "./components/Container/Container";

import "./App.scss";

const classPrefix = "mdb-app";

export const App: FunctionComponent = () => {
    return (
        <div className={classPrefix}>
            <header className={`${classPrefix}__header`}>
                <Container>
                    <h2>Movies</h2>
                </Container>
            </header>

            <div className={`${classPrefix}__content`}>
                <Container maxWidth="md">
                    <MoviesList />
                </Container>
            </div>
        </div>
    );
};
