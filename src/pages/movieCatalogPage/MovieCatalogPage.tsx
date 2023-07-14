import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { MovieCard } from "../../components/movieCard/MovieCard";
import { useFetchAllMovies } from "../../components/api/movieList/useFetchAllMovies";

export const MovieCatalogPage = () => {
  const { isLoadingAllMovies, movies } = useFetchAllMovies();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      gap="2rem"
      marginBottom="5rem"
      maxWidth="60%"
    >
      <Typography
        variant="h1"
        color="var(--text-primary)"
        sx={{ fontWeight: "bold" }}
      >
        ALL MOVIES
      </Typography>
      <Grid container spacing={4}>
        {movies.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoadingAllMovies ? (
              <CircularProgress />
            ) : (
              <MovieCard movie={item} index={index} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
