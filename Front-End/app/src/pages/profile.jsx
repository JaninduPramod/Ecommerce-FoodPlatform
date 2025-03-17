import React from "react";
import { Box, Typography } from "@mui/material";

const ProfilePage = () => {
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
        <Typography variant={"h2"}>Profile Page</Typography>
      </Box>
    </>
  );
};
export default ProfilePage;
