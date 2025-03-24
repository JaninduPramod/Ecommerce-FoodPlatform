import * as React from "react";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import WeightTabs from "./WeightTabs";
import { ArrowDropDown } from "@mui/icons-material";

const ProductCard = ({ productdetails }) => {
  const productWeights = [1, 2];

  const [quantity, setQuantity] = React.useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, marginBottom: "20px", mx: "20px" }}>
      <CardMedia
        component="img"
        height="300px"
        image="https://staticcdn.redcliffelabs.com/media/gallary-file/None/e60b97dc-c476-41eb-9bf4-648ebb21d805.webp"
        alt="Burger"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="label"
          sx={{ color: "text.secondary", mt: "30px" }}
        >
          {productdetails.PRODUCT_CATEGORY}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "black", fontSize: "17px", mt: "10px" }}
        >
          {productdetails.PRODUCT_NAME}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", mt: "5px" }}>
            ${productdetails.PRODUCT_PRICE}
          </Typography>
          <Box
            sx={{
              height: "38px",
              width: "80px",
              backgroundColor: "green",
              marginLeft: "auto",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <Typography sx={{ color: "white", fontWeight: "bold", mt: "2px" }}>
              4.0
            </Typography>
            <StarIcon sx={{ color: "#ffcc00", fontSize: "16px", ml: "5px" }} />
          </Box>
        </Box>
        <Box sx={{ mt: "10px" }}>
          <WeightTabs weights={productWeights} />
        </Box>

        <Box
          className="quantity-cart"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            mt: "10px",
          }}
        >
          <Box
            clasName="quantity-increaser"
            sx={{
              mt: "10px",
              backgroundColor: "#7772",
              height: "60px",
              width: "125px",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontFamily: "monospace", fontSize: "20px", color: "gray" }}
            >
              Qty
            </Typography>
            <TextField
              InputProps={{
                style: {
                  color: "black",
                  width: "48px",
                  height: "32px",
                  letterSpacing: "1px",
                  fontWeight: "bold",
                  backgroundColor: "white",
                },
              }}
              value={quantity}
              onChange={e => {
                setQuantity(Number(e.target.value));
              }}
            ></TextField>
            <Box
              sx={{
                color: "black",
                display: "flex",
                justifyContent: "center",

                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <ArrowDropUpIcon
                sx={{
                  color: "gray",
                  ":hover": {
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                fontSize="medium"
                onClick={increaseQuantity}
              />
              <ArrowDropDown
                sx={{
                  color: "gray",
                  ":hover": {
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                fontSize="medium"
                onClick={decreaseQuantity}
              />
            </Box>
          </Box>
          <Box
            clasName="add-to-cart"
            sx={{
              mt: "10px",
              backgroundColor: "#ff7d01",
              height: "48px",
              width: "48px",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s ease-in-out",
              ":hover": {
                backgroundColor: "black",
                cursor: "pointer",
              },
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: "28px", color: "white" }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
