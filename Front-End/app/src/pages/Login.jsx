import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {  useNavigate } from 'react-router-dom'

const AuthSection = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", width:"100vw" , bgcolor: "white", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          bgcolor:"white"
         
        }}
      >
        {/* Signup Section */}
        <Paper sx={{ padding: 2, width: "30%", textAlign: "left", height:"300px",  }} elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight:"bold" }}>
            New Customer
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize:"13px", marginTop:"20px" }}>
            By creating an account you will be able to shop faster, be up to date on an order’s status, 
            and keep track of the orders you have previously made.
          </Typography>
          
          <Button variant="contained" sx={{ mt: 3, backgroundColor: "#ff7f00", borderRadius:"5px", width:"180px"  }} onClick={handleCreateAccount}>
            Create Account
          </Button>
      
        </Paper>

        {/* Login Section */}
        <Paper sx={{ padding: 2, textAlign: "center", height:"300px" }} elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ display:"flex", alignItems:"center", textAlign:"left" , fontWeight:"bold" }}>
            <LoginIcon sx={{ mr:1 }} />
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign:"left" }}>
            If you have an account, please log in.
          </Typography>
          <TextField fullWidth label="Email" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mt: 2 }} />
          <Typography variant="body2"  color="textSecondary" sx={{ mt: 2, cursor: "pointer", textAlign: "right",
            "&:hover":{
                color: "red",   
            }
           }} >
            Forgot your password?
          </Typography>
          <Button variant="contained" sx={{ mt: 3, backgroundColor: "#ff7f00", }} >
            Sign In
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthSection;