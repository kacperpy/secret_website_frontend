import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./HomePage.module.css";
import { mockedMovies } from "./data/mockData";
import { ItemScrollableList } from "./components/ItemScrollableList";
import { ChangeEvent, useState } from "react";
import tmp_img from "./data/1.jpg";
import axios from "axios";
import { apiKey } from "../../private/api_data";

export const HomePage = () => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [response, setResponse] = useState("");

  const fetchData = async () => {
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `tell me a max 20 word description of the movie: ${textFieldValue}`,
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
        console.log("IsLoading: " + isLoading);
        const description = response.data.choices[0]?.message?.content;
        setResponse(response.data.choices[0]?.message?.content);
        addMovieToList(textFieldValue, description);
      })
      .catch((error: any) => {
        console.error("Error fetching images:", error);
      })
      .finally(() => {
        setIsLoading(false);
        setShowAlert(true);
      });
  };

  function addMovieToList(value: string, description: string) {
    mockedMovies.push({
      title: value,
      description: description,
      image: tmp_img,
    });
  }

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      gap="2rem"
      className={styles.homePageContainer}
    >
      <Typography
        variant="h1"
        color="var(--text-primary)"
        style={{ fontWeight: "bold", paddingTop: "4rem" }}
      >
        FILMY.
      </Typography>
      <ItemScrollableList movies={mockedMovies} />
      <Divider style={{ width: "100%" }} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap="1rem"
      >
        <TextField
          id="outlined-basic"
          placeholder="Co tym razem?"
          variant="outlined"
          style={{ width: "20rem" }}
          value={textFieldValue}
          onChange={handleTextFieldChange}
        />
        <Button
          variant="contained"
          disableElevation
          style={{ width: "50%" }}
          onClick={fetchData}
        >
          Dodaj
        </Button>
      </Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          Movie has been added!
        </Alert>
      </Snackbar>
    </Box>
  );
};
