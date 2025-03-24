import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MappingDiv = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;

  const cardMapper = async () => {
    const res = await fetch("http://localhost:3000/api/v4/allproducts");
    const data = await res.json();
    setProducts(data.data || []);
  };

  useEffect(() => {
    cardMapper();
  }, []);

  const scrollRight = () => {
    if (startIndex + visibleCards < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        mx: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        mt: "25px",
      }}
    >
      {products.length > visibleCards && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 2,
            backgroundColor: "white",
            boxShadow: 1,
            visibility: startIndex > 0 ? "visible" : "hidden",
            transition: "all 0.2s ease-in-out",
            ":hover": { backgroundColor: "#ff7d01", color: "white" },
          }}
        >
          <ArrowBackIos sx={{ fontSize: "40px" }} />
        </IconButton>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          width: "90%",
          padding: "10px",
          transform: `translateX(-${startIndex * 100}%)`, // Moves cards smoothly
          transition: "transform 0.5s ease-in-out", // Smooth transition effect
        }}
      >
        {products
          .slice(startIndex, startIndex + visibleCards)
          .map((product, index) => (
            <ProductCard key={index} productdetails={product} />
          ))}
      </Box>

      {products.length > visibleCards && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 2,
            backgroundColor: "white",
            boxShadow: 4,
            visibility:
              startIndex + visibleCards < products.length
                ? "visible"
                : "hidden",
            transition: "all 0.2s ease-in-out",
            ":hover": { backgroundColor: "#ff7d01", color: "white" },
          }}
        >
          <ArrowForwardIos sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default MappingDiv;
