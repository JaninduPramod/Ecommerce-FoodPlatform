import React from "react";
import { AppBar, Toolbar, Typography, Box, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
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
              Tab 5
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
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: "#ff7d01",
                height: "30px",
                ":hover": { backgroundColor: "black" },
              }}
            >
              1 Item
            </Button>
          </Box>
        </Paper>
      </AppBar>
    </>
  );
};
export default NavBar;
