import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
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
    </>
  );
};
export default HomePage;
