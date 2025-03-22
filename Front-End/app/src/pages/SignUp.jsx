
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from "axios";

const SignUpPage = () => {

  //handle formData
  const [ formData, setFormData ] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
  });

  const [ message, setMessage ] = useState("");

  //handle input changes
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response =  axios.post("http:8080:....../signup", formData);
      console.log("User registered successfully : ", response.data);
      
      setMessage("Register successful! Redirecting...");

      setTimeout(() => {
          window.location.href = "/login";
      },2000);

    }catch(error){
      console.error("There was an error ", error);

    }
  };




  return(
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "white", width:"100vw" , padding: 2 }}>

      <Paper sx={{ padding: 3, width: { xs: "60%", md: "30%" }, textAlign: "center" }} elevation={3}>

        <Typography variant="h5" gutterBottom sx={{ display:"flex" , alignItems:"center", justifyContent:"center" ,fontWeight:"bold"}}>
          <PersonAddIcon sx={{ mr:1 }} />
          Create Account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom >
          Sign up to access all features and manage your orders easily.
        </Typography>

        <form action="" onSubmit={ handleSubmit }>
          <TextField 
            fullWidth 
            label="Full Name" 
            variant="outlined" 
            sx={{ mt: 2 }}
            name="fullName"
            value={formData.fullName}
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
            label="Contact" 
            variant="outlined" 
            sx={{ mt: 2 }}
            name="contact"
            value={formData.contact}
            onChange={handleChange}
           />
          <TextField 
            fullWidth 
            label="Address" 
            variant="outlined" 
            sx={{ mt: 2 }}
            name="address"
            value={formData.address}
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

          <Button 
            variant="contained" 
            sx={{ mt: 3, backgroundColor: "#ff7f00" }} 
            fullWidth 
            type="submit"
          >
            Sign Up
          </Button>
        </form>
    
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login"><span style={{ color: "blue", cursor: "pointer", "&:hover":{color:"ff7f00"} }}   >Login</span></Link> 
        </Typography>
        
      </Paper>
    </Box>
    </>
  );
};

export default SignUpPage;
