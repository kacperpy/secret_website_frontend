import axios from "axios";
import { useState } from "react";
import { MOVIE_API_ADRESS } from "../api";

export const useDeleteMovie = () => {
  const [isDeletingMovie, setIsDeletingMovie] = useState(false);

  const deleteMovie = (uuid: string) => {
    setIsDeletingMovie(true);
    console.log("REMOVING MOVIE...\n");
    axios
      .delete(`http://${MOVIE_API_ADRESS}/api/movies/${uuid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("user_auth_token")}`,
        },
      })
      .then((response: { data: any }) => {
        console.log("\nMOVIE HAS BEEN REMOVED\n");
      })
      .catch((error: any) => {
        console.error("Error removing movie:", error);
      })
      .finally(() => {
        setIsDeletingMovie(false);
      });
  };

  return { isDeletingMovie, deleteMovie };
};
