import React, { useState } from "react";
import { Box, Paper, Typography, Button, TextField  } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

const Profile = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Hansi Tharuka");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
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

                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize:"15px"}}>
                   {name}
                </Typography>

                    <Button variant="contained" size="small" sx={{ mt: 3, backgroundColor: "#ff7f00" }} onClick={handleEditClick} startIcon={ <EditNoteIcon />}>
                      Edit Profile
                    </Button>

             
                    <Button variant="contained" size="small" sx={{ mt: 3, backgroundColor: "#ff7f00" , ml:3 ,}} startIcon={ <DeleteIcon />}>
                      Delete
                    </Button>
                    </>
                    
                ) : (
                    <>
                         
                        <Typography variant="h6" sx={{ mt: 2 }}>Edit Address</Typography>
                        <TextField fullWidth label="First Name" variant="outlined" sx={{ mt: 2 }} defaultValue="Hansi" />
                        <TextField fullWidth label="Last Name" variant="outlined" sx={{ mt: 2 }} defaultValue="Tharuka" />
                        <TextField fullWidth label="Company" variant="outlined" sx={{ mt: 2 }} defaultValue="NBM" />
                        <TextField fullWidth label="Address 1" variant="outlined" sx={{ mt: 2 }} defaultValue='Aththudawa",Aluthduwa,Palatuwa,Matara' />
                        <TextField fullWidth label="City" variant="outlined" sx={{ mt: 2 }} defaultValue="Matara" />
                        <TextField fullWidth label="Postal/ZIP Code" variant="outlined" sx={{ mt: 2 }} defaultValue="81000" />
                        <TextField fullWidth label="Phone" variant="outlined" sx={{ mt: 2 }} defaultValue="+94761082063" />

                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 4}}>
                            <Box>
                                <Button variant="contained" sx={{ backgroundColor: "#ff7f00", mr:2 }} >
                                Update Address
                                </Button>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                Cancel
                                </Button>
                            </Box>
                        
                        <Link to="/">
                        <Button variant="outlined" color="error" sx={{}}>
                            Log out
                        </Button>
                        </Link>
                        </Box>
                       
                    </>
                )}

                </Paper>



            </Box>
        </>
    )
};
export default Profile;