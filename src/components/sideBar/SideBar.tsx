import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { MouseEvent, KeyboardEvent } from "react";
import { routes } from "./data/sideBarContent";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const SideBar = ({ open, onClose }: SideBarProps) => {
  const curLocation = useLocation();
  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      onClose();
    };

  const handleLogout = () => {
    localStorage.removeItem("authed_user");
    localStorage.removeItem("user_auth_token");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="25rem"
        height="100vh"
        sx={{ backgroundColor: "var(--primary)" }}
        gap="2rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          {routes.map((item, index) => (
            <Typography
              key={index}
              component={Link}
              to={item.url}
              sx={{
                fontSize: "1.5rem",
                color:
                  curLocation.pathname === item.url
                    ? "var(--text-primary-hover)"
                    : "var(--text-primary)",
                textDecoration: "none",
                transition: "color 0.1s ease",
                "&:hover": {
                  color: "var(--text-primary-hover)",
                },
              }}
            >
              {item.name}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ width: "80%" }}></Divider>
        <Button
          variant="outlined"
          onClick={handleLogout}
          disabled={localStorage.getItem("authed_user") === null}
        >
          log out
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
