import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";

export const useFetchMovieArtwork = () => {
  const [isLoadingArtwork, setIsLoadingArtwork] = useState(true);
  const [url, setUrl] = useState("");

  const fetchMovieArtwork = (title: string) => {
    setIsLoadingArtwork(true);
    console.log("\nFETCHING MOVIE ARTWORK...\n");
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: `${title} movie artwork`,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response: { data: any }) => {
        const artworkUrl = response.data.data[0]?.url;
        console.log("\nMOVIE ARTWORK HAS BEEN FETCHED\n");
        setUrl(artworkUrl);
      })
      .catch((error: any) => {
        console.error("Error fetching images:", error);
      })
      .finally(() => {
        setIsLoadingArtwork(false);
      });
  };

  return { isLoadingArtwork, url, fetchMovieArtwork };
};
