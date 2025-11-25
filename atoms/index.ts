import { atom } from "jotai";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchPersonCredits,
  fetchPersonDetails,
  fetchSearchMovies,
  fetchSimilarMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";
import { atomFamily } from "jotai/utils";

export const trendingMoviesAtom = atom(async () => {
  const movies = await fetchTrendingMovies();
  return movies.results;
});

export const upcomingMoviesAtom = atom(async () => {
  const movies = await fetchUpcomingMovies();
  return movies.results;
});

export const topRatedMoviesAtom = atom(async () => {
  const movies = await fetchTopRatedMovies();
  return movies.results;
});

export const movieCreditsAtom = atomFamily((id: string | number) =>
  atom(async () => {
    const credits = await fetchMovieCredits(id);
    return credits.cast;
  })
);

export const similarMoviesAtom = atomFamily((id: string | number) =>
  atom(async () => {
    const movies = await fetchSimilarMovies(id);
    return movies.results;
  })
);

export const movieDetailsAtom = atomFamily((id: string | number) =>
  atom(async () => {
    const movie = await fetchMovieDetails(id);
    return movie;
  })
);

export const personDetailsAtom = atomFamily((id: string | number) =>
  atom(async () => {
    const person = await fetchPersonDetails(id);
    return person;
  })
);

export const personCreditsAtom = atomFamily((id: string | number) =>
  atom(async () => {
    const credits = await fetchPersonCredits(id);
    return credits.cast;
  })
);

export const searchMoviesAtom = atomFamily((query: string) =>
  atom(async () => {
    const movies = await fetchSearchMovies(query);
    return movies.results;
  })
);
