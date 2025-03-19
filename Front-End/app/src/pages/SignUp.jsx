import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "white",
          width: "100vw",
          padding: 2,
        }}
      >
        <Paper
          sx={{
            padding: 3,
            width: { xs: "60%", md: "30%" },
            textAlign: "center",
          }}
          elevation={3}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sign up to access all features and manage your orders easily.
          </Typography>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Contact"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#ff7f00" }}
            fullWidth
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login">
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  "&:hover": { color: "ff7f00" },
                }}
              >
                Login
              </span>
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default SignUpPage;
