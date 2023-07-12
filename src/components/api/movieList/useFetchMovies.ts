import axios from "axios";
import { useEffect, useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useFetchMovies = () => {
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [movies, setMovies] = useState<MovieItem[]>([
    {
      uuid: "",
      title: "",
      description: "",
      description_long: "",
      image_url: "",
      image_file: "",
      created_at: "",
      is_active: false,
    },
  ]);

  const fetchMovies = () => {
    setIsLoadingMovies(true);
    console.log("\nFETCHING MOVIES...\n");
    axios
      .get(`http://${MOVIE_API_ADRESS}/api/user-active-movies/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
        },
      })
      .then((response: { data: any }) => {
        const movies = response.data;
        console.log("\nMOVIE LIST HAS BEEN FETCHED\n");
        setMovies(movies);
      })
      .catch((error: any) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setIsLoadingMovies(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("authed_user")) {
      fetchMovies();
    } else {
      console.log("USER MUST BE AUTHENTICATED IN ORDER TO FETCH MOVIE LIST!");
    }
  }, []);

  return { isLoadingMovies, movies, fetchMovies };
};
