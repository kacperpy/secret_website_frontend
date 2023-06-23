import { Box, Button, Drawer } from "@mui/material";
import { MouseEvent, KeyboardEvent } from "react";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const SideBar = ({ open, onClose }: SideBarProps) => {
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
