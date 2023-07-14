import axios from "axios";
import { useEffect, useState } from "react";
import { MovieItem } from "../openAi/types";
import { MOVIE_API_ADRESS } from "../api";

export const useFetchAllMovies = () => {
  const [isLoadingAllMovies, setIsLoadingAllMovies] = useState(false);
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

  const fetchAllMovies = () => {
    setIsLoadingAllMovies(true);
    console.log("\nFETCHING ALL MOVIES...\n");
    axios
      .get(`http://${MOVIE_API_ADRESS}/api/user-movies/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
        },
      })
      .then((response: { data: any }) => {
        const movies = response.data;
        console.log("\nALL MOVIES LIST HAS BEEN FETCHED\n");
        setMovies(movies);
      })
      .catch((error: any) => {
        console.error("Error fetching all movies:", error);
      })
      .finally(() => {
        setIsLoadingAllMovies(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("authed_user")) {
      fetchAllMovies();
    } else {
      console.log(
        "USER MUST BE AUTHENTICATED IN ORDER TO FETCH ALL MOVIES LIST!"
      );
    }
  }, []);

  return { isLoadingAllMovies, movies, fetchAllMovies };
};
