import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthSection = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v2/userLogin",
        { USER_EMAIL: formData.email, USER_PASSWORD: formData.password },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        if (response.data.role === "supplier") {
          // navigate("/supplierPage");
          console.log(response.data.role, "Logged In ");
        } else if (response.data.role === "customer") {
          console.log(response.data.role, "Logged In ");
          navigate("/onboarding");
        }
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "white",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          bgcolor: "white",
        }}
      >
        <Paper
          sx={{ padding: 2, width: "30%", textAlign: "left", height: "300px" }}
          elevation={3}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            New User
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "13px", marginTop: "20px" }}
          >
            By creating an account you will be able to shop faster, be up to
            date on an order’s status, and keep track of the orders you have
            previously made.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#ff7f00",
              borderRadius: "5px",
              width: "180px",
            }}
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </Paper>

        <Paper
          sx={{ padding: 2, textAlign: "center", height: "300px" }}
          elevation={3}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            <LoginIcon sx={{ mr: 1 }} />
            Login
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "left" }}
          >
            If you have an account, please log in.
          </Typography>

          <form action="" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ mt: 2 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              sx={{ mt: 2 }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                mt: 2,
                cursor: "pointer",
                textAlign: "right",
                "&:hover": {
                  color: "red",
                },
              }}
            >
              Forgot your password?
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#ff7f00" }}
              type="submit"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthSection;
