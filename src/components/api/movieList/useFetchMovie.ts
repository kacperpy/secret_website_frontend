import axios from "axios";
import { useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useFetchMovie = () => {
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [movie, setMovie] = useState<MovieItem | null>(null);

  const fetchMovie = (uuid: string) => {
    setIsLoadingMovie(true);
    console.log("\nFETCHING MOVIE...\n");
    axios
      .get(`http://${MOVIE_API_ADRESS}/api/movies/${uuid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
        },
      })
      .then((response: { data: any }) => {
        const movie = response.data;
        console.log("\nMOVIE HAS BEEN FETCHED\n");
        setMovie(movie);
      })
      .catch((error: any) => {
        console.error("Error fetching movie:", error);
      })
      .finally(() => {
        setIsLoadingMovie(false);
      });
  };

  return { isLoadingMovie, movie, fetchMovie };
};
