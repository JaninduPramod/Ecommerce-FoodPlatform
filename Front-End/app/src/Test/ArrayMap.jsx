import { Container, Box, Typography, Paper } from "@mui/material";
import React from "react";

const CardLayout = ({ Person }) => {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: "white",
          width: "20%",
          height: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: "30px",
          mx: "30px",
          mb: "30px",
          "& *": {
            fontWeight: "bold",
          },
        }}
      >
        <Typography variant="h5">{Person.name}</Typography>
        <Typography variant="h5">{Person.age}</Typography>
        <Typography variant="h5">{Person.address}</Typography>
        <Typography variant="h5">{Person.email}</Typography>
      </Paper>
    </>
  );
};

const MapBox = () => {
  const persons = [
    {
      name: "janindu",
      age: 21,
      address: "Matara",
      email: "jp@gmail",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: "25px",
            backgroundColor: "#121212",
            width: "75%",
            height: "50%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {persons.map(person => (
            <CardLayout Person={person} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default MapBox;
