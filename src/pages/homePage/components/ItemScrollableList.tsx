import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

interface MovieItem {
  title: string;
  description: string;
  image: string;
}

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
            color: "var(--text-secondary)",
            fontSize: "3rem",
            cursor: "pointer",
          }}
        />
      )}
      {visibleMovies.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "14rem",
            height: "22rem",
            backgroundColor: "var(--details)",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={item.image}
            alt="green iguana"
            sx={{
              border: "10px solid",
              borderColor: "var(--details)",
              boxSizing: "border-box",
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="start"
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="start"
            >
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {startIndex + MAX_CARDS < movies.length && (
        <ArrowForwardIosIcon
          onClick={handleScrollRight}
          sx={{
            position: "fixed",
            right: "8rem",
            color: "var(--text-secondary)",
            fontSize: "3rem",
            cursor: "pointer",
          }}
        />
      )}
    </Box>
  );
};
