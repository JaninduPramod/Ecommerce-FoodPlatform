import React from "react";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
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
        <Typography variant={"h2"}>Login Page</Typography>
      </Box>
    </>
  );
};
export default LoginPage;
