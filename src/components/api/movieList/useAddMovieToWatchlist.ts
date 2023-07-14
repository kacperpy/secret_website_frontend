import axios from "axios";
import { useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useAddMovieToWatchlist = () => {
  const [isAddingMovieToWatchlist, setIsAddingMovieToWatchlist] =
    useState(false);

  const updateMovie = (movie: MovieItem) => {
    setIsAddingMovieToWatchlist(true);
    console.log("ADDING MOVIE TO WATCHLIST...\n");
    axios
      .post(
        `http://${MOVIE_API_ADRESS}/api/movies/${movie.uuid}/add-to-watchlist/`,
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
        movie.is_active = true;
      })
      .catch((error: any) => {
        console.error("Error adding movie to watchlist:", error);
      })
      .finally(() => {
        setIsAddingMovieToWatchlist(false);
      });
  };

  const addMovieToWatchlist = (movie: MovieItem) => {
    if (localStorage.getItem("authed_user")) {
      updateMovie(movie);
    } else {
      console.log(
        "USER MUST BE AUTHENTICATED IN ORDER TO ADD MOVIE TO WATCHLIST!"
      );
    }
  };

  return { isAddingMovieToWatchlist, addMovieToWatchlist };
};
