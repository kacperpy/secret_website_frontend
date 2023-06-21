import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./HomePage.module.css";
import { mockedMovies } from "./data/mockData";
import { ItemScrollableList } from "./components/ItemScrollableList";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchMovieArtwork } from "../../components/api/openAi/useFetchMovieArtwork";
import { useFetchMovieDescription } from "../../components/api/openAi/useFetchMovieDescription";

export const HomePage = () => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { isLoadingDescription, description, fetchMovieDescription } =
    useFetchMovieDescription();
  const { isLoadingArtwork, url, fetchMovieArtwork } = useFetchMovieArtwork();

  const handleAddButtonClick = () => {
    setIsLoadingData(true);
    fetchMovieDescription(textFieldValue);
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  useEffect(() => {
    if (!isLoadingDescription) {
      fetchMovieArtwork(textFieldValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDescription]);

  useEffect(() => {
    if (!isLoadingArtwork) {
      addMovieToList(textFieldValue, description, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingArtwork]);

  function addMovieToList(value: string, description: string, url: string) {
    mockedMovies.push({
      title: value,
      description: description,
      image: url,
    });
    setTextFieldValue("");
    setIsLoadingData(false);
    setShowAlert(true);
  }

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
        style={{ fontWeight: "bold", paddingTop: "2.5%" }}
      >
        MOVIES.
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
          disabled={isLoadingData}
        />
        {isLoadingData ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            disableElevation
            style={{ width: "50%" }}
            onClick={handleAddButtonClick}
          >
            ADD
          </Button>
        )}
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
