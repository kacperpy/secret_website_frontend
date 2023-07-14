import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ItemScrollableList } from "./components/ItemScrollableList";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchMovieDetails } from "../../components/api/openAi/useFetchMovieDetails";
import { useFetchMovieDescription } from "../../components/api/openAi/useFetchMovieDescription";
import { useFetchMovies } from "../../components/api/movieList/useFetchMovies";
import { useCreateMovie } from "../../components/api/movieList/useCreateMovie";

export const HomePage = () => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoadingDescription, description, fetchMovieDescription } =
    useFetchMovieDescription();
  const { isLoadingData, movieDetails, fetchMovieDetails } =
    useFetchMovieDetails();
  const { isLoadingMovies, movies } = useFetchMovies();
  const { createMovie, isCreatingMovie, createdMovie } = useCreateMovie();

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const handleMovieAdd = () => {
    setIsLoading(true);
    fetchMovieDescription(textFieldValue);
  };

  useEffect(() => {
    if (!isLoadingDescription && description !== "") {
      fetchMovieDetails(textFieldValue, description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDescription]);

  useEffect(() => {
    if (!isLoadingData && movieDetails != null) {
      createMovie(movieDetails);
      setTextFieldValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingData]);

  useEffect(() => {
    if (!isCreatingMovie && createdMovie != null) {
      movies.push(createdMovie);
      setIsLoading(false);
      setShowAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreatingMovie]);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        gap="2rem"
      >
        <Typography
          variant="h1"
          color="var(--text-primary)"
          sx={{ fontWeight: "bold" }}
        >
          WATCHLIST
        </Typography>
        {isLoadingMovies ? (
          <CircularProgress />
        ) : (
          <ItemScrollableList movies={movies} />
        )}
        <Divider style={{ width: "100%" }} />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap="1rem"
        >
          <TextField
            id="outlined-basic"
            placeholder="What now?"
            variant="outlined"
            style={{ width: "20rem" }}
            value={textFieldValue}
            onChange={handleTextFieldChange}
            disabled={isLoading}
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              disableElevation
              style={{ width: "50%" }}
              onClick={handleMovieAdd}
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
    </Container>
  );
};
