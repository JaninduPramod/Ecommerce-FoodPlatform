import React from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const WeightTabs = ({ weights }) => {
  const [selectedWeight, setSelectedWeight] = React.useState(weights[0]);
  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        mt: "10px",
      }}
    >
      {weights.length > 3 && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: -18,
            zIndex: 2,
            background: "white",
            boxShadow: 1,
            visibility: weights.length > 3 ? "visible" : "hidden",
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {weights.map((weight, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: "6px",
              border: "1px solid",
              fontSize: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "35px",
              minWidth: "65px",
              px: "10px",
              backgroundColor: selectedWeight === weight ? "white" : "#7772",
              color: selectedWeight === weight ? "black" : "gray",
              borderColor: selectedWeight === weight ? "black" : "gray",
              fontWeight: selectedWeight === weight ? "bold" : "normal",
              cursor: "pointer",
              transition: "all 0.1s ease-in-out",
            }}
            onClick={() => setSelectedWeight(weight)}
          >
            {weight}Kg
          </Box>
        ))}
      </Box>

      {weights.length > 3 && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: -24,
            zIndex: 2,
            background: "white",
            boxShadow: 1,
            visibility: weights.length > 3 ? "visible" : "hidden",
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default WeightTabs;
