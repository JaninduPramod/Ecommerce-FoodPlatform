import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SupplierNavbar from "../components/SupplierNavbar"; 

const SupProfile = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);  
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v3/getSupplier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({
        fullName: response.data.FULLNAME || "",
        email: response.data.EMAIL || "",
        contact: response.data.CONTACT || "",
        address: response.data.ADDRESS || "",
        password: response.data.PASSWORD || "",
        username: response.data.USERNAME || "",
        role: response.data.ROLE || "",
      });
      
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const updateData = {
        p_CRUD_TYPE: "UPDATE",
        p_FULL_NAME: user.fullName,
        p_PHONE: user.contact,
        p_ADDRESS: user.address,
        p_IMAGE_URL: "image.src"
      };

      console.log(user.role);

      await axios.put(
        "http://localhost:3000/api/v3/updateSupplier",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsEditing(false);
      fetchUserProfile();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleClickDelete = () => {
    setOpenDialog(true);
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3000/api/v2/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Your account has been deleted successfully.");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the account. Please try again.");
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
    <SupplierNavbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
       
      <Box
        sx={{
          bgcolor: "white",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            bgcolor: "lightyellow",
            width: { xs: "80%", md: "40%" },
            padding: 5,
            mt: 9.5,
            height:"200 px"
          }}
          elevation={3}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
          >
            Account
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ fontSize: "17px", mb: 3 }}
          >
            Account Details
          </Typography>

          {!isEditing ? (
            <>
              <Paper sx={{ bgcolor: "lightyellow", padding: 2 }} elevation={3}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.fullName}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.email}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.contact}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.address}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.role}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: "15px" }}
                >
                  {user.username}
                </Typography>
              </Paper>

              <Button
                variant="contained"
                size="small"
                sx={{ mt: 3, background: "linear-gradient(90deg, #28a745, #218838)" }}
                onClick={handleEditClick}
                startIcon={<EditNoteIcon />}
              >
                Edit Profile
              </Button>

              <Button
                variant="contained"
                size="small"
                sx={{ mt: 3, background: "linear-gradient(90deg, #28a745, #218838)", ml: 3 }}
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                sx={{ mt: 2 }}
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Contact"
                variant="outlined"
                sx={{ mt: 2 }}
                name="contact"
                value={user.contact}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                sx={{ mt: 2 }}
                name="address"
                value={user.address}
                onChange={handleChange}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    sx={{ background: "linear-gradient(90deg, #28a745, #218838)", mr: 2 }}
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{}}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickDelete}
                  >
                    Delete
                  </Button>

                  <Dialog open={openDialog} onClose={handleCancelDelete}>
                    <DialogTitle>Delete Account</DialogTitle>

                    <DialogContent>
                      Are you sure you want to delete your account? This action
                      cannot be undone.
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                      </Button>

                      <Button onClick={handleDeleteUser} color="error">
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>

                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};
export default SupProfile;
