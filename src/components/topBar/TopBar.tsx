import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("authed_user") || null
  );

  window.addEventListener("storage", () => {
    const updatedUser = localStorage.getItem("authed_user") || null;
    setUser(updatedUser);
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      width="100%"
      height="8rem"
      zIndex="10"
      sx={{ backgroundColor: "var(--primary)" }}
    >
      <SideBar open={open} onClose={() => setOpen(false)} />
      <Box display="flex" sx={{ marginLeft: "3rem" }}>
        <MenuIcon
          onClick={() => setOpen(true)}
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
      {user === null ? (
        <Box display="flex" sx={{ marginRight: "3rem" }}>
          <Typography
            component={Link}
            to={"/login"}
            sx={{
              fontSize: "2rem",
              color: "var(--text-primary)",
              textDecoration: "none",
              "&:hover": {
                color: "var(--text-primary-hover)",
              },
            }}
          >
            log in
          </Typography>
        </Box>
      ) : (
        <Box display="flex" sx={{ marginRight: "3rem" }}>
          {user === "julcia" ? (
            <FavoriteIcon
              sx={{ fontSize: "3rem", color: "var(--text-primary)" }}
            />
          ) : (
            <PersonIcon
              sx={{ fontSize: "3rem", color: "var(--text-primary)" }}
            />
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
      )}
    </Box>
  );
};
