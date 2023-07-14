import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { MovieItem } from "../../../components/api/openAi/types";
import { MovieCard } from "../../../components/movieCard/MovieCard";

interface ItemScrollableListProps {
  movies: MovieItem[];
}

const MAX_CARDS = 5;

const arrowSxActive = {
  color: "var(--text-primary)",
  fontSize: "3rem",
  cursor: "pointer",
  transition: "color 0.1s ease",
  "&:hover": {
    color: "var(--text-primary-hover)",
  },
};

const arrowSxInactive = {
  color: "var(--text-primary-disabled)",
  fontSize: "3rem",
};

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
      {startIndex > 0 ? (
        <ArrowBackIosIcon onClick={handleScrollLeft} sx={arrowSxActive} />
      ) : (
        <ArrowBackIosIcon sx={arrowSxInactive} />
      )}
      {visibleMovies.map((item, index) => (
        <MovieCard movie={item} index={index} />
      ))}
      {startIndex + MAX_CARDS < movies.length ? (
        <ArrowForwardIosIcon onClick={handleScrollRight} sx={arrowSxActive} />
      ) : (
        <ArrowForwardIosIcon sx={arrowSxInactive} />
      )}
    </Box>
  );
};
