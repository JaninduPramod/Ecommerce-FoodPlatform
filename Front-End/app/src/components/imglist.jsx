import React from "react";
import { Box, Container, Paper } from "@mui/material";
const ImageListComponent = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: "50px",
          width: "100%vw",
          height: "580px",
          mx: "80px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "black",
            width: "30%",
            height: "100%",
            backgroundImage:
              "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/latestbanner-1_6851363a-7d3a-44ed-b7bb-08d50a621bb6.jpg?v=1643175184)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            mt: "13px",
            ":hover": { boxShadow: 10 },
          }}
        ></Paper>

        <Box sx={{ width: "70%", height: "100%" }}>
          <Box
            sx={{
              width: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "pink",
                height: "90%",
                width: "45%",
                backgroundImage:
                  "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/latestbanner-2_8536ff61-02f7-41d4-bcc2-e0bd996867cb.jpg?v=1643175198)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                ":hover": { boxShadow: 10 },
              }}
            ></Paper>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "pink",
                height: "90%",
                width: "45%",
                backgroundImage:
                  "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/latestbanner-3_d9c06624-ab5e-4327-9ee3-488774f48ed1.jpg?v=1643175212)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                ":hover": { boxShadow: 10 },
              }}
            ></Paper>
          </Box>

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "red",
              width: "93%",
              height: "49%",
              backgroundImage:
                "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/Rectangle_1268_copy_2.jpg?v=1643175228)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "15px",
              marginLeft: "32px",
              mt: "17px",
              ":hover": { boxShadow: 10 },
            }}
          ></Paper>
        </Box>
      </Box>
    </>
  );
};
export default ImageListComponent;
