import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOVIE_API_ADRESS } from "../api";

export const useCreateAuthToken = () => {
  const [isLoadingAuthToken, setIsLoadingAuthToken] = useState(false);
  const navigate = useNavigate();

  const createAuthToken = (username: string, password: string) => {
    setIsLoadingAuthToken(true);
    console.log("\nFETCHING AUTH TOKEN...\n");
    axios
      .post(
        `http://${MOVIE_API_ADRESS}/api-auth-token/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: { data: any }) => {
        const token = response.data.token;
        localStorage.setItem("user_auth_token", token);
        localStorage.setItem("authed_user", username);
        window.dispatchEvent(new Event("storage"));
        console.log("\nAUTH TOKEN HAS BEEN FETCHED\n");
      })
      .catch((error: any) => {
        console.error("Error fetching auth token: ", error);
      })
      .finally(() => {
        setIsLoadingAuthToken(false);
        navigate("/");
      });
  };

  return { isLoadingAuthToken, createAuthToken };
};
