import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./HomePage.module.css";
import { mockedMovies } from "./data/mockData";
import { ItemScrollableList } from "./components/ItemScrollableList";

export const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      height="100vh"
      gap="2rem"
      className={styles.homePageContainer}
    >
      <Typography
        variant="h1"
        color="var(--text-secondary)"
        style={{ fontWeight: "bold" }}
      >
        DO OBEJRZENIA
      </Typography>
      <ItemScrollableList movies={mockedMovies} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap="1rem"
      >
        <TextField
          id="outlined-basic"
          placeholder="Co tym razem?"
          variant="filled"
          style={{ width: "20rem" }}
        />
        <Button variant="contained" disableElevation style={{ width: "50%" }}>
          Dodaj
        </Button>
      </Box>
    </Box>
  );
};
