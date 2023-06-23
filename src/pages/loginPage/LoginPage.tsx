import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCreateAuthToken } from "../../components/api/auth/useCreateAuthToken";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { isLoadingAuthToken, createAuthToken } = useCreateAuthToken();

  const handleLogin = () => {
    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (username !== "" && password !== "") {
      createAuthToken(username, password);
    }
  };

  useEffect(() => {
    if (username !== "") setUsernameError(false);
    if (password !== "") setPasswordError(false);
  }, [username, password]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      gap="2rem"
    >
      <Typography variant="h3">hello</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="flex-end"
        gap="1rem"
      >
        <TextField
          label="username"
          value={username}
          required
          error={usernameError}
          helperText={usernameError ? "Field must not be empty!" : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="password"
          value={password}
          required
          type="password"
          error={passwordError}
          helperText={passwordError ? "Field must not be empty!" : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoadingAuthToken ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{ width: "50%" }}
            variant="contained"
            onClick={handleLogin}
          >
            login
          </Button>
        )}
      </Box>
    </Box>
  );
};
