import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  //handle formData
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  //handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v2/newuser",
        {
          p_CRUD_TYPE: "INSERT",
          p_USER_NAME: formData.username,
          p_USER_EMAIL: formData.email,
          p_USER_PASSWORD: formData.password,
          p_USER_ROLE: formData.role,
        },
      );
      console.log(response.data.msg);

      if (response.data.msg == "Null Values are not Accepted!") {
        alert("Null Values are not Accepted!");
      } else {
        setTimeout(() => {
          navigate("/onboarding");
        }, 2000);
      }
    } catch (error) {
      console.error("There was an error ", error);
    }
  };

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

          <form action="" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              sx={{ mt: 2 }}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
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
              variant="outlined"
              sx={{ mt: 2 }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            <TextField
              select
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              name="role"
              value={formData.role}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="supplier">Seller</option>
              <option value="customer">Buyer</option>
            </TextField>

            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#ff7f00" }}
              fullWidth
              type="submit"
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/">
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
