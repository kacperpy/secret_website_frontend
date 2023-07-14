import { Box, Typography } from "@mui/material";

export const ConfidentialPage = () => {
  return (
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
  );
};
