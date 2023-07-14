import React, { useState } from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { createCustomTheme } from "./utils/createCustomTheme";
import { ThemeProvider } from "@emotion/react";
import { HomePage } from "./pages/homePage/HomePage";
import { TopBar } from "./components/topBar/TopBar";
import { MovieDetailsPage } from "./pages/movieDetailsPage/MovieDetailsPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { Box, Typography } from "@mui/material";

function App() {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("authed_user") || null
  );
  const theme = createCustomTheme();

  window.addEventListener("storage", () => {
    const updatedUser = localStorage.getItem("authed_user") || null;
    setUser(updatedUser);
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopBar />
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/:uuid/details" element={<MovieDetailsPage />} />
          </Routes>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            height="70vh"
          >
            <Typography
              variant="h1"
              color="var(--text-primary)"
              sx={{
                fontWeight: "bold",
                paddingTop: "2.5%",
                textAlign: "center",
              }}
            >
              💀CONFIDENTIAL💀
            </Typography>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
