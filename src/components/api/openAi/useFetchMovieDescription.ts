import axios from "axios";
import { useState } from "react";
import { apiKey } from "../../../private/api_data";

export const useFetchMovieDescription = () => {
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const [description, setDescription] = useState("");

  const fetchMovieDescription = (title: string) => {
    setIsLoadingDescription(true);
    console.log("\nFETCHING MOVIE DESCRIPTION...\n");
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `tell me a max 20 word description of the movie: ${title}`,
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
        console.log("\nMOVIE DESCRIPTION HAS BEEN FETCHED\n");
        setDescription(description);
      })
      .catch((error: any) => {
        console.error("Error fetching description: ", error);
      })
      .finally(() => {
        setIsLoadingDescription(false);
      });
  };

  return { isLoadingDescription, description, fetchMovieDescription };
};
