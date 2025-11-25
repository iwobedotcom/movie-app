import axios from "axios";
import { API_KEY, BASEURL } from "../constants";

const trendingMoviesUrl = `${BASEURL}/trending/movie/day?language=en-US&api_key=${API_KEY}`;
const upcomingMoviesUrl = `${BASEURL}/movie/upcoming?language=en-US&api_key=${API_KEY}`;
const topRatedMoviesUrl = `${BASEURL}/movie/top_rated?language=en-US&api_key=${API_KEY}`;

const movieDetailsUrl = (movie_id: string | number) =>
  `${BASEURL}/movie/${movie_id}?language=en-US&api_key=${API_KEY}`;

const movieCreditsUrl = (movie_id: string | number) =>
  `${BASEURL}/movie/${movie_id}/credits?language=en-US&api_key=${API_KEY}`;

const similarMoviesUrl = (movie_id: string | number) =>
  `${BASEURL}/movie/${movie_id}/similar?language=en-US&api_key=${API_KEY}`;

const personDetails = (person_id: string | number) =>
  `${BASEURL}/person/${person_id}?language=en-US&api_key=${API_KEY}`;

const personCredits = (person_id: string | number) =>
  `${BASEURL}/person/${person_id}/tv_credits?language=en-US&api_key=${API_KEY}`;

const searchMovies = (query: string) =>
  `${BASEURL}/search/movie?query=${query}&language=en-US&api_key=${API_KEY}`;

async function ApiCall(endpoint: string, params?: { [key: string]: string }) {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
}

export const fetchTrendingMovies = () => {
  return ApiCall(trendingMoviesUrl);
};

export const fetchUpcomingMovies = () => {
  return ApiCall(upcomingMoviesUrl);
};

export const fetchTopRatedMovies = () => {
  return ApiCall(topRatedMoviesUrl);
};

export const fetchMovieDetails = (movie_id: string | number) => {
  return ApiCall(movieDetailsUrl(movie_id));
};

export const fetchMovieCredits = (movie_id: string | number) => {
  return ApiCall(movieCreditsUrl(movie_id));
};

export const fetchSimilarMovies = (movie_id: string | number) => {
  return ApiCall(similarMoviesUrl(movie_id));
};

export const fetchPersonDetails = (person_id: string | number) => {
  return ApiCall(personDetails(person_id));
};

export const fetchPersonCredits = (person_id: string | number) => {
  return ApiCall(personCredits(person_id));
};

export const fetchSearchMovies = (query: string) => {
  return ApiCall(searchMovies(query));
};
