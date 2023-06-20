import React from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { createCustomTheme } from "./utils/createCustomTheme";
import { ThemeProvider } from "@emotion/react";
import { HomePage } from "./pages/homePage/HomePage";
import { TopBar } from "./components/topBar/TopBar";

function App() {
  const theme = createCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
