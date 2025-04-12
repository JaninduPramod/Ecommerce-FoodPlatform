import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const SupplierNavbar = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#2E7D32" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Supplier Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate("/supplierPage")}>
              <ListItemText primary="Add Product" />
            </ListItem>
            <ListItem button onClick={() => navigate("/my-products")}>
              <ListItemText primary="My Products" />
            </ListItem>
            <ListItem button onClick={() => navigate("/sup-prof")}>
              <ListItemText primary="My Profile" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SupplierNavbar;
