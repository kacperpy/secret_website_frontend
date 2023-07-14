import React, { useState } from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { createCustomTheme } from "./utils/createCustomTheme";
import { ThemeProvider } from "@emotion/react";
import { HomePage } from "./pages/homePage/HomePage";
import { TopBar } from "./components/topBar/TopBar";
import { MovieDetailsPage } from "./pages/movieDetailsPage/MovieDetailsPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { ConfidentialPage } from "./pages/confidentialPage/ConfidentialPage";
import { MovieCatalogPage } from "./pages/movieCatalogPage/MovieCatalogPage";

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
            <Route path="/movie-catalog" element={<MovieCatalogPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ConfidentialPage />} />
          </Routes>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
