import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { MovieItem } from "../../../components/api/openAi/types";

interface ItemScrollableListProps {
  movies: MovieItem[];
}

const MAX_CARDS = 5;

export const ItemScrollableList = ({ movies }: ItemScrollableListProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleScrollLeft = (): void => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleScrollRight = (): void => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, movies.length - MAX_CARDS)
    );
  };

  const visibleMovies = movies.slice(startIndex, startIndex + MAX_CARDS);
  return (
    <Box display="flex" flexDirection="row" gap="2rem" alignItems="center">
      {startIndex > 0 && (
        <ArrowBackIosIcon
          onClick={handleScrollLeft}
          sx={{
            position: "fixed",
            left: "8rem",
            color: "var(--text-primary)",
            fontSize: "3rem",
            cursor: "pointer",
            transition: "color 0.1s ease",
            "&:hover": {
              color: "var(--text-primary-hover)",
            },
          }}
        />
      )}
      {visibleMovies.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "14rem",
            backgroundColor: "var(--primary)",
          }}
        >
          <CardMedia
            component="img"
            height="220"
            image={item.image}
            alt="movie artwork"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="var(--text-primary)"
              textAlign="start"
              textOverflow="clip"
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="var(--text-primary)"
              textAlign="start"
              height={60}
              overflow="auto"
            >
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "var(--details)",
                "&:hover": {
                  backgroundColor: "#d15c68",
                },
              }}
            >
              Mark as seen
            </Button>
          </CardActions>
        </Card>
      ))}
      {startIndex + MAX_CARDS < movies.length && (
        <ArrowForwardIosIcon
          onClick={handleScrollRight}
          sx={{
            position: "fixed",
            right: "8rem",
            color: "var(--text-primary)",
            fontSize: "3rem",
            cursor: "pointer",
            transition: "color 0.1s ease",
            "&:hover": {
              color: "var(--text-primary-hover)",
            },
          }}
        />
      )}
    </Box>
  );
};
