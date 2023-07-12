import axios from "axios";
import { useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useRemovieMovieFromWatchlist = () => {
  const [isRemovingMovieFromWatchlist, setIsRemovingMovieFromWatchlist] =
    useState(false);

  const updateMovie = (movie: MovieItem) => {
    setIsRemovingMovieFromWatchlist(true);
    console.log("REMOVING MOVIE FROM WATCHLIST...\n");
    axios
      .post(
        `http://${MOVIE_API_ADRESS}/api/movies/${movie.uuid}/remove-from-watchlist/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
          },
        }
      )
      .then((response: { data: any }) => {
        console.log(`\n${response.data}\n`);
        movie.is_active = false;
      })
      .catch((error: any) => {
        console.error("Error removing movie from watchlist:", error);
      })
      .finally(() => {
        setIsRemovingMovieFromWatchlist(false);
      });
  };

  const removeMovieFromWatchlist = (movie: MovieItem) => {
    if (localStorage.getItem("authed_user")) {
      updateMovie(movie);
    } else {
      console.log(
        "USER MUST BE AUTHENTICATED IN ORDER TO REMOVE MOVIE FROM WATCHLIST!"
      );
    }
  };

  return { isRemovingMovieFromWatchlist, removeMovieFromWatchlist };
};
