import React from "react";
import { AppBar, Toolbar, Typography, Box, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ alignItems: "center", backgroundColor: "transparent", boxShadow: "none" }}>
      <Paper
        elevation={3}
        sx={{
          height: "90px",
          width: "90%",
          backgroundColor: "lightyellow",
          marginTop: 1,
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Foody-Logo.svg/2093px-Foody-Logo.svg.png"
          sx={{
            height: "80%",
            objectFit: "contain",
          }}
        />

        {/* Navigation Tabs */}
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
            to="/"
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
            to="/tab4"
            sx={{
              fontFamily: "cursive",
              color: "black",
              textDecoration: "none",
              ":hover": { color: "#ff7d01" },
            }}
          >
            Tab 4
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/tab5"
            sx={{
              fontFamily: "cursive",
              color: "black",
              textDecoration: "none",
              ":hover": { color: "#ff7d01" },
            }}
          >
            Tab 5
          </Typography>
        </Box>

        {/* Right Icons */}
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
          {/* Search Icon */}
          <SearchIcon
            sx={{
              fontSize: "30px",
              ":hover": { color: "#ff7d01" },
              cursor: "pointer",
            }}
          />

          {/* User Login */}
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
              to="/login"
              sx={{
                fontSize: "16px",
                color: "black",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Log in
            </Typography>
          </Box>

          {/* Shopping Cart */}
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            sx={{
              backgroundColor: "#ff7d01",
              height: "35px",
              minWidth: "100px",
              ":hover": { backgroundColor: "black" },
            }}
          >
            1 Item
          </Button>
        </Box>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
