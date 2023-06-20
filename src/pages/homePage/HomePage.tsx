import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import styles from "./HomePage.module.css";
import { mockedMovies } from "./data/mockData";
import { ItemScrollableList } from "./components/ItemScrollableList";
import { ChangeEvent, useState } from "react";
import tmp_img from "./data/1.jpg";

export const HomePage = () => {
  const [textFieldValue, setTextFieldValue] = useState("");

  function addMovieToList(value: string) {
    mockedMovies.push({
      title: value,
      description: "tmp description",
      image: tmp_img,
    });
  }

  const handleButtonClick = () => {
    addMovieToList(textFieldValue);
  };

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
          onClick={handleButtonClick}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
};
