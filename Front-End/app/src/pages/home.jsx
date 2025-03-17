import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ImageListComponent from "../components/imglist";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%vw",
          height: "500px",
          mt: "75px",
          backgroundImage:
            "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/slider-1_8d15eebe-d99f-4800-af09-a24e70339c55.jpg?v=1625900666)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "120px",
            gap: "30px",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Organic Fresh Fruits <br /> For Your Health
          </Typography>
          <Typography variant="label">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut <br /> labore et dolore magna aliqua.
          </Typography>
          <Button
            sx={{
              width: "140px",
              height: "45px",
              backgroundColor: "#ff7d01",
              color: "white",
              borderRadius: "12px",
              ":hover": { backgroundColor: "black" },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <ImageListComponent />
      <Container sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Trending Products
        </Typography>
      </Container>

      <Box sx={{ height: "800px" }}></Box>
    </>
  );
};
export default HomePage;
