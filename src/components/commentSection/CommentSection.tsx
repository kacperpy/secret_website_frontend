import { Box, Paper, Typography } from "@mui/material";

export const CommentSection = () => {
  return (
    <Box display="flex" flexDirection="column" width="100%" marginTop="4rem">
      <Typography variant="h4">Comments</Typography>
      <Box>
        <Paper
          variant="outlined"
          sx={{ backgroundColor: "var(--primary)", height: "2rem" }}
        >
          comment
        </Paper>
      </Box>
    </Box>
  );
};
