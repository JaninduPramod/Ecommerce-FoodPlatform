import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDialog from "./CartDialog";
import axios from "axios";

const NavBar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v6/cartProducts",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log("Fetched cart items:", response.data);

        if (response.data && Array.isArray(response.data.msg)) {
          setCartItems(response.data.msg);
          setCartCount(response.data.msg.length);
        } else {
          console.warn("Invalid response format or no items in cart.");
          setCartItems([]);
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
        setCartCount(0);
      }
    };

    if (cartOpen) fetchCartItems();
  }, [cartOpen]);

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  return (
    <>
      <AppBar sx={{ alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            height: "90px",
            width: "90%",
            backgroundColor: "lightyellow",
            marginTop: 1,
            borderRadius: "18px",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Foody-Logo.svg/2093px-Foody-Logo.svg.png"
            sx={{
              color: "black",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Box>

          <Box
            sx={{
              height: "75%",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/onboarding"
              sx={{
                fontFamily: "cursive",
                color: "black",
                textDecoration: "none",
                ":hover": { color: "#ff7d01" },
              }}
            >
              Home
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/product"
              sx={{
                fontFamily: "cursive",
                color: "black",
                textDecoration: "none",
                ":hover": { color: "#ff7d01" },
              }}
            >
              Products
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              sx={{
                fontFamily: "cursive",
                color: "black",
                textDecoration: "none",
                ":hover": { color: "#ff7d01" },
              }}
            >
              My Orders
            </Typography>
          </Box>

          <Box
            sx={{
              color: "black",
              height: "75%",
              width: "20%",
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "30px",
                ":hover": { color: "#ff7d01" },
                cursor: "pointer",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { color: "#ff7d01" },
                cursor: "pointer",
              }}
            >
              <Person2Icon sx={{ fontSize: "30px" }} />
              <Typography
                component={Link}
                to={"/profile"}
                sx={{
                  fontSize: "16px",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Profile
              </Typography>
            </Box>

            <IconButton
              onClick={handleCartOpen}
              sx={{
                backgroundColor: "#ff7d01",
                height: "40px",
                width: "120px",
                ":hover": { backgroundColor: "black" },
                borderRadius: "20px",
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
              <Typography variant="body2" sx={{ color: "white", ml: 1 }}>
                {cartCount === 1 ? "1 Item" : `${cartCount} Items`}
              </Typography>
            </IconButton>
          </Box>
        </Paper>
      </AppBar>

      <CartDialog
        open={cartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default NavBar;
