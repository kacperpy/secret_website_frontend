import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";
import { MovieItem } from "./types";

export const useFetchMovieDetails = () => {
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [cast, setCast] = useState("");
  const [movieDetails, setMovieDetails] = useState<MovieItem>({
    title: "",
    description: "",
    image: "",
  });
  const [artworkUrl, setArtworkUrl] = useState("");

  const fetchMovieDetails = (movieTitle: string) => {
    setIsLoadingRecommendation(true);
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
        axios.spread((data1, data2, data3) => {
          const responseShortDescription =
            data1.data.choices[0]?.message?.content;
          const responseLongDescription =
            data2.data.choices[0]?.message?.content;
          const responseArtworkUrl = data3.data[0]?.url;

          setShortDescription(responseShortDescription);
          setLongDescription(responseLongDescription);
          setArtworkUrl(responseArtworkUrl);
          setMovieDetails({
            title: movieTitle,
            description: responseShortDescription,
            image: responseArtworkUrl,
          });
        })
      );
  };

  return { movieDetails, fetchMovieDetails };
};
