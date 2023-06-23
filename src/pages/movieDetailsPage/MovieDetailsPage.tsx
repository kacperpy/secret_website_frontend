import { Box, Button, Divider, Typography } from "@mui/material";
import mockImg from "../homePage/data/1.jpg";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { mockedMovies } from "../homePage/data/mockData";
import { useEffect, useState } from "react";
import { MovieItem } from "../../components/api/openAi/types";

export const MovieDetailsPage = () => {
  const { uuid } = useParams();
  const [tmpMovie, setTmpMovie] = useState<MovieItem | undefined>(undefined);

  useEffect(() => {
    if (uuid !== undefined) {
      const tmpMovieTitle = uuid.replace(/-/g, " ");
      console.log(tmpMovieTitle);
      setTmpMovie(JSON.parse(localStorage.getItem("tmpMovie") || "{}"));
    }
  }, [uuid]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
      paddingTop="5rem"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="end"
        justifyContent="center"
        gap="2rem"
      >
        <img
          src={tmpMovie !== undefined ? tmpMovie.image : mockImg}
          style={{ width: "30rem", height: "30rem" }}
          alt="mock"
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          <Typography variant="h3" style={{ maxWidth: "30rem" }}>
            {tmpMovie !== undefined ? tmpMovie.title : "tmp title"}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            gap="0.5rem"
            justifyContent="flex-start"
          >
            <Button variant="outlined" startIcon={<AddIcon />}>
              Add to watchlist
            </Button>
            <Button variant="outlined">Recommend similar</Button>
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
          {tmpMovie !== undefined
            ? tmpMovie.descriptionLong
            : "tmp description long"}
        </Typography>
      </Box>
    </Box>
  );
};
