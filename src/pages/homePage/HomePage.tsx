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
  const { isLoadingDescription, description, fetchMovieDescription } =
    useFetchMovieDescription();
  const { isLoadingData, movieDetails, fetchMovieDetails } =
    useFetchMovieDetails();
  const { isLoadingMovies, movies } = useFetchMovies();
  const { createMovie, isCreatingMovie, createdMovie } = useCreateMovie();
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("authed_user") || null
  );

  window.addEventListener("storage", () => {
    const updatedUser = localStorage.getItem("authed_user") || null;
    setUser(updatedUser);
  });

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
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
      setShowAlert(true);
      setTextFieldValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingData]);

  useEffect(() => {
    if (!isCreatingMovie && createdMovie != null) {
      movies.push(createdMovie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreatingMovie]);

  return (
    <Container>
      {user ? (
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
            style={{ fontWeight: "bold", paddingTop: "2.5%" }}
          >
            WATCHLIST.
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
              disabled={isLoadingData || isLoadingDescription}
            />
            {isLoadingData || isLoadingDescription ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                disableElevation
                style={{ width: "50%" }}
                onClick={() => {
                  fetchMovieDescription(textFieldValue);
                }}
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
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          height="70vh"
        >
          <Typography
            variant="h1"
            color="var(--text-primary)"
            sx={{ fontWeight: "bold", paddingTop: "2.5%", textAlign: "center" }}
          >
            💀CONFIDENTIAL💀
          </Typography>
        </Box>
      )}
    </Container>
  );
};
