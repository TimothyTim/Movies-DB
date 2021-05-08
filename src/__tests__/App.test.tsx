import React from 'react';
import { render, waitFor, screen } from "@testing-library/react";
import { App } from '../App';

import { rest } from "msw";
import { setupServer } from "msw/node";

import {moviesResp} from "../__mocks__/movies";

// https://api.themoviedb.org/3/search/movie?api_key=01bfc5e83ec9b72845761f48aec9715a&language=en-US&query=anchor&page=1&include_adult=false
const handlers = [
    rest.get("https://api.themoviedb.org/3/search/movie", (req, res, ctx) => {
        // const query = req.url.searchParams;
        // const id = query.get("id");

        return res(ctx.json(moviesResp));
    })
];

const server = setupServer(...handlers);

describe("App", () => {
    const renderFn = () => {
        return render(
            <App />
        );
    };

    beforeAll(() => server.listen({
        onUnhandledRequest: "warn",
    }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("renders header successfully", () => {
        renderFn();

        expect(screen.getByText("Movies")).toBeInTheDocument();
    });

    test("renders list of movies returned by the api", async () => {
        renderFn();

        await waitFor(() => screen.getByText(/Top Gun/));

        const movies = screen.getAllByTestId("movie-element");

        expect(movies.length).toEqual(moviesResp.results.length)
    });

    test.todo("shows loading when awaiting movies search response from the api");

    test.todo("renders the movie name");

    test.todo("changes the page when the pagination buttons are pressed");
});
