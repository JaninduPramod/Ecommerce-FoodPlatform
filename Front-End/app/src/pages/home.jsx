import React from "react";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          color: "black",
          height: "1000px",
          width: "100%",
          mt: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h2"}>Home Page</Typography>
      </Box>
    </>
  );
};
export default HomePage;
