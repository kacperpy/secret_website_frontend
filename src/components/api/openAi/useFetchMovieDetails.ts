import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";
import { MovieItem } from "./types";

export const useFetchMovieDetails = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieItem | null>(null);

  const fetchMovieDetails = (movieTitle: string, movieDescription: string) => {
    setIsLoadingData(true);
    console.log("\nFETCHING MOVIE DETAILS...\n");
    axios
      .all([
        axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Provided a movie title: ${movieTitle} and a short description: ${movieDescription}, create a max 200 word, detailed description of the storyline of that movie.`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        ),
        axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: `${movieTitle} movie artwork`,
            n: 1,
            size: "512x512",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((response1, response2) => {
          const responseLongDescription =
            response1.data.choices[0]?.message?.content;
          const responseArtworkUrl = response2.data.data[0]?.url;

          setMovieDetails({
            uuid: "",
            title: movieTitle,
            description: movieDescription,
            description_long: responseLongDescription,
            image_url: responseArtworkUrl,
            image_file: "",
            created_at: "",
          });
          console.log("\nMOVIE DETAILS FETCHED\n");
        })
      )
      .catch((error: any) => {
        console.error("Error fetching details: ", error);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };
  return { isLoadingData, movieDetails, fetchMovieDetails };
};
