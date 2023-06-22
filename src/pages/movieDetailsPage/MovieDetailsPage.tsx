import { Box, Button, Divider, Typography } from "@mui/material";
import { MovieItem } from "../../components/api/openAi/types";
import mockImg from "../homePage/data/1.jpg";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

export const MovieDetailsPage = () => {
  const { uuid } = useParams();
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
          src={mockImg}
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
            {uuid}
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
          a group of chipmunks living in a park are constantly harassed and
          mistreated by inconsiderate humans. Despite their best efforts to
          avoid conflict, they are driven to their breaking point and begin to
          seek revenge.\n\nInitially, their efforts are comical, as they steal
          picnic baskets and knock over trash cans. But as their anger continues
          to grow, their actions become more destructive, causing chaos and
          damage throughout the park.\n\nAs the humans begin to take notice of
          the chipmunks' behavior, they realize that they have underestimated
          the intelligence and determination of these small creatures. A group
          of park rangers and animal control officers set out to catch the
          chipmunks, but their efforts are thwarted at every turn, as the
          chipmunks work together to outsmart their human adversaries.\n\nIn the
          end, the humans come to understand the importance of respecting all
          forms of life, no matter how small. The chipmunks, having exacted
          their revenge, are able to live in peace and harmony with the humans
          around them. \"Angry Chipmunks\" is a fun-filled adventure that will
          entertain audiences of all ages, reminding us all of the importance of
          kindness and respect for all living creatures.
        </Typography>
      </Box>
    </Box>
  );
};
