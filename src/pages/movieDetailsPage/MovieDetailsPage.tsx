import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import mockImg from "../homePage/data/1.jpg";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetchMovie } from "../../components/api/movieList/useFetchMovie";
import { useRemovieMovieFromWatchlist } from "../../components/api/movieList/useRemoveMovieFromWatchlist";

export const MovieDetailsPage = () => {
  const { uuid } = useParams();
  const { isLoadingMovie, movie, fetchMovie } = useFetchMovie();
  const { isRemovingMovieFromWatchlist, removeMovieFromWatchlist } =
    useRemovieMovieFromWatchlist();

  const handleRemoveMovieFromWatchlist = () => {
    if (movie !== null) {
      removeMovieFromWatchlist(movie);
    }
  };

  useEffect(() => {
    if (uuid !== undefined) {
      fetchMovie(uuid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
      paddingBottom="5rem"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="end"
        justifyContent="center"
        gap="2rem"
      >
        {isLoadingMovie ? (
          <CircularProgress />
        ) : (
          <img
            src={movie?.image_file || mockImg}
            style={{ width: "30rem", height: "30rem" }}
            alt="movie artwork"
          />
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          <Typography variant="h3" style={{ maxWidth: "30rem" }}>
            {movie?.title || "???"}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            gap="0.5rem"
            justifyContent="flex-start"
          >
            {isRemovingMovieFromWatchlist ? (
              <CircularProgress />
            ) : (
              <Button
                variant="outlined"
                color="error"
                disabled={!movie?.is_active}
                startIcon={<RemoveIcon />}
                onClick={handleRemoveMovieFromWatchlist}
              >
                remove from watchlist
              </Button>
            )}
            <Button variant="outlined" disabled>
              recommend similar
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ width: "100%" }} />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="end"
        justifyContent="center"
        gap="2rem"
      >
        <Typography variant="body1" style={{ maxWidth: "50rem" }}>
          {movie?.description_long || "???"}
        </Typography>
      </Box>
    </Box>
  );
};
