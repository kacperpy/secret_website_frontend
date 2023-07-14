import {
  // Button,
  Card,
  // CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { MovieItem } from "../api/openAi/types";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: MovieItem;
  index: number;
}

export const MovieCard = ({ movie, index }: MovieCardProps) => {
  return (
    <Card
      key={index}
      sx={{
        width: "14rem",
        height: "25.5rem",
        backgroundColor: "var(--primary)",
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={movie.image_file}
        alt="movie artwork"
      />
      <CardContent>
        <Link style={{ textDecoration: "none" }} to={`/${movie.uuid}/details`}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="var(--text-primary)"
            textAlign="start"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            sx={{ textDecoration: "none" }}
          >
            {movie.title}
          </Typography>
        </Link>
        <Divider style={{ width: "90%", marginBottom: "0.7rem" }} />
        <Typography
          variant="body2"
          color="var(--text-primary)"
          textAlign="start"
          height={100}
          overflow="auto"
        >
          {movie.description}
        </Typography>
      </CardContent>
      {/* <CardActions>
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
  </CardActions> */}
    </Card>
  );
};
