import axios from "axios";
import { useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useCreateMovie = () => {
  const [isCreatingMovie, setIsCreatingMovie] = useState(false);
  const [createdMovie, setCreatedMovie] = useState<MovieItem | null>(null);

  const postMovie = (movie: MovieItem) => {
    setIsCreatingMovie(true);
    console.log("CREATING MOVIE...\n");
    axios
      .post(
        `http://${MOVIE_API_ADRESS}/api/movies/`,
        {
          title: movie.title,
          description: movie.description,
          description_long: movie.description_long,
          image_url: movie.image_url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
          },
        }
      )
      .then((response: { data: any }) => {
        const responseCreatedMovie = response.data;
        console.log("\nMOVIE HAS BEEN CREATED\n");
        setCreatedMovie(responseCreatedMovie);
      })
      .catch((error: any) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setIsCreatingMovie(false);
      });
  };

  const createMovie = (movie: MovieItem) => {
    if (localStorage.getItem("authed_user")) {
      postMovie(movie);
    } else {
      console.log("USER MUST BE AUTHENTICATED IN ORDER TO ADD A NEW MOVIE!");
    }
  };

  return { isCreatingMovie, createdMovie, createMovie };
};
