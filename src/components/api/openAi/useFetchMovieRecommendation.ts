import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";

export const useFetchMovieRecommendation = () => {
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [description, setDescription] = useState("");

  const fetchMovieRecommendation = (titles: string) => {
    setIsLoadingRecommendation(true);
    console.log("\nFETCHING MOVIE RECOMMENDATION...\n");
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Based on the provided list of movie titles, recommend me a movie that i might like. The list is: ${titles}. Please respond with only the movie title.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response: { data: any }) => {
        const description = response.data.choices[0]?.message?.content;
        console.log("\nMOVIE RECOMMENDATION HAS BEEN FETCHED\n");
        setDescription(description);
      })
      .catch((error: any) => {
        console.error("Error fetching recommendation: ", error);
      })
      .finally(() => {
        setIsLoadingRecommendation(false);
      });
  };

  return { isLoadingRecommendation, description, fetchMovieRecommendation };
};
