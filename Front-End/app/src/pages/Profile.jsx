import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () =>{

    const navigate = useNavigate();

    const [ isEditing, setIsEditing ] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    
    const [ user, setUser ] = useState({
        fullName: " Hansi Tharuka",
        email: " janinduPramod@gmail.com",
        contact: "0767608263",
        address1: "Nandana, Aththudawa, Palatuwa, Matara",
        company: "NIBM",
        city: "Matara",
        postalCode: "81000",

    });


    useEffect( () => {
        fetchUserProfile();
    }, [] ); //The empty dependency array ([]) means this effect runs only once, when the component first mounts.


    const fetchUserProfile = async () => {
        try{
            const response = await axios.get("http://localhost:8080/user/profile", { withCredentials: true, });

            setUser(response.data);
        }
                
        catch(error){
            console.error("Error fetching profile:", error);
            // navigate("/login");
        }

    };


    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value} );
    };


    const handleEditClick = () => {
        setIsEditing(true);
    };


    const handleUpdateProfile = async () => {
        try{
            await axios.put("http://localhost:8080/user/profile", user, {withCredentials: true} );

            setIsEditing(false);

            fetchUserProfile();

            
        }
        catch(error){
            console.error("Error updating profile:", error);
        }
    };


    const handleClickDelete = () => {
            setOpenDialog(true);
    };


    const handleDeleteUser = async () => {
        try {
            await axios.delete("http://localhost:8080/user/profile", { withCredentials: true });

            alert("Your account has been deleted successfully.");

            localStorage.removeItem("user");

            navigate("/login");

          }
           catch (error) {

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
    };


    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };


    return(
        <>
            <Box sx={{ bgcolor:"white", minHeight:"100vh", width:"100vw", display:"flex",alignItems:"center",justifyContent:"center"}} >
                <Paper sx={{ bgcolor:"lightyellow", width: { xs: "80%", md: "50%" } , padding:5 , mt:9.5}} elevation={3}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight:"bold", textAlign:"center", mb:3}}>
                    Account
                </Typography>

                <Typography variant="body2"  gutterBottom sx={{ fontSize:"17px", mb:3}}>
                    Account Details
                </Typography>


                {!isEditing ? (
                    <>

                <Paper sx={{ bgcolor:"lightyellow", padding:2 , }} elevation={3}>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.fullName}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.email}                  
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.contact}                  
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.address1}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.company}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.city}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {user.postalCode}
                </Typography>
                </Paper>

                    <Button variant="contained" size="small" sx={{ mt: 3, backgroundColor: "#ff7f00" }} onClick={handleEditClick} startIcon={ <EditNoteIcon />}>
                      Edit Profile
                    </Button>

             
                    <Button variant="contained" size="small" sx={{ mt: 3, backgroundColor: "#ff7f00" , ml:3 ,}} startIcon={<LogoutIcon />} onClick={handleLogout}>
                      Log Out
                    </Button>

                    </>
                    
                ) : (
                    <>
                         
                        <Typography variant="h6" sx={{ mt: 2 }}>Edit Address</Typography>
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
                            label="Email" 
                            variant="outlined" 
                            sx={{ mt: 2 }}
                            name="email"
                            value={user.email}
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
                            label="Address 1" 
                            variant="outlined" 
                            sx={{ mt: 2 }}
                            name="address1"
                            value={user.address1}
                            onChange={handleChange}  
                        />


                        <TextField 
                            fullWidth 
                            label="Company" 
                            variant="outlined" 
                            sx={{ mt: 2 }}
                            name="company"
                            value={user.company}
                            onChange={handleChange}
                        />   

                        <TextField 
                            fullWidth 
                            label="City" 
                            variant="outlined" 
                            sx={{ mt: 2 }}
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                        />

                        <TextField 
                            fullWidth 
                            label="Postal/ZIP Code" 
                            variant="outlined" 
                            sx={{ mt: 2 }} 
                            name="postalCode" 
                            value={user.postalCode}
                            onChange={handleChange}
                        />
                        
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 4}}>
                            <Box>
                                <Button variant="contained" sx={{ backgroundColor: "#ff7f00", mr:2 }} onClick={handleUpdateProfile}>
                                Update Profile
                                </Button>

                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    sx={{}}  
                                    startIcon={ <DeleteIcon />} 
                                    onClick={handleClickDelete}
                                >
                                 Delete
                                </Button>    

                                <Dialog open={openDialog} onClose={handleCancelDelete}>
                                    <DialogTitle>
                                        Delete Account
                                    </DialogTitle>

                                    <DialogContent>
                                        Are you sure you want to delete your account? This action cannot be undone.
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
    )
};
export default Profile;