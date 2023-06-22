import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";

export const TopBar = () => {
  let user = "Kacper";
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      width="100%"
      height="8rem"
    >
      <Box display="flex" sx={{ marginLeft: "3rem" }}>
        {user === "Kacper" ? (
          <PersonIcon sx={{ fontSize: "3rem", color: "var(--text-primary)" }} />
        ) : (
          <Box display="flex">
            <Person2Icon
              sx={{ fontSize: "3rem", color: "var(--text-primary)" }}
            />
          </Box>
        )}
        <Typography
          sx={{
            fontSize: "2rem",
            color: "var(--text-primary)",
            fontWeight: "bold",
            marginLeft: "1rem",
          }}
        >
          {user}
        </Typography>
      </Box>
      <Typography
        component={Link}
        to="/"
        sx={{
          fontSize: "1.5rem",
          color: "var(--text-primary)",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        moviemovie.com
      </Typography>
      <Box display="flex" sx={{ marginRight: "3rem" }}>
        <MenuIcon
          sx={{
            fontSize: "3rem",
            color: "var(--text-primary)",
            cursor: "pointer",
            transition: "color 0.1s ease",
            "&:hover": {
              color: "var(--text-primary-hover)",
            },
          }}
        />
      </Box>
    </Box>
  );
};
