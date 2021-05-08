import React from 'react';
import { render, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { App } from '../App';

import { rest } from "msw";
import { setupServer } from "msw/node";

import {moviesResp} from "../__mocks__/movies";

jest.mock("../hooks/useQuery", () => ({
    useQuery: () => ({
        s: "Top+Gun",
        page: "1"
    })
}));

const handlers = [
    rest.get("https://api.themoviedb.org/3/search/movie", (req, res, ctx) => {
        // const query = req.url.searchParams;
        // const id = query.get("id");

        return res(ctx.json(moviesResp));
    })
];
const server = setupServer(...handlers);
const renderFn = () => {
    return render(
        <App />
    );
};

beforeEach(() => {
    server.listen({
        onUnhandledRequest: "warn",
    })
});
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

    expect(movies.length).toEqual(moviesResp.results.length);
});

test("renders the movie name", async () => {
    renderFn();

    await waitFor(() => expect(screen.getByText("Top Gun")).toBeInTheDocument());
});

test("renders a search box", async () => {
    renderFn();

    const inputEl = screen.getByTestId("search");

    expect(inputEl).toBeInTheDocument();
});

test("renders a pagination container", async () => {
    renderFn();

    await waitFor(() => screen.getByText(/Top Gun/));

    const paginationEl = screen.getByTestId("pagination");

    expect(paginationEl).toBeInTheDocument();
});
