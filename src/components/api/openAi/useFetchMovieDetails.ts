import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";
import { MovieItem } from "./types";

export const useFetchMovieDetails = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieItem | null>(null);

  const fetchMovieDetails = (movieTitle: string) => {
    setIsLoadingData(true);
    console.log("\nFETCHING ALL MOVIE DETAILS...\n");
    axios
      .all([
        axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `tell me a max 20 word description of the movie: ${movieTitle}`,
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
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `For the movie titled: ${movieTitle}, provide a max 200 word, detailed description of the storyline.`,
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
        axios.spread((response1, response2, response3) => {
          const responseShortDescription =
            response1.data.choices[0]?.message?.content;
          const responseLongDescription =
            response2.data.choices[0]?.message?.content;
          const responseArtworkUrl = response3.data.data[0]?.url;

          setMovieDetails({
            title: movieTitle,
            description: responseShortDescription,
            image: responseArtworkUrl,
          });
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
