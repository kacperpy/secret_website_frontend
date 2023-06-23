import axios from "axios";
import { useState } from "react";
import { MovieItem } from "../openAi/types";

export const useFetchMovie = () => {
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [movie, setMovie] = useState<MovieItem | null>(null);

  const fetchMovie = (uuid: string) => {
    setIsLoadingMovie(true);
    console.log("\nFETCHING MOVIES...\n");
    axios
      .get(`http://127.0.0.1:8000/api/movies/${uuid}/`, {
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
        console.error("Error fetching movie details:", error);
      })
      .finally(() => {
        setIsLoadingMovie(false);
      });
  };

  return { isLoadingMovie, movie, fetchMovie };
};
