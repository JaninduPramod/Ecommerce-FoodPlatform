import { Container, Box, Typography, Paper } from "@mui/material";
import React from "react";

const CardLayout = ({ Person }) => {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: "white",
          width: "20%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: "30px",
          mx: "30px",
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
    {
      name: "shan",
      age: 28,
      address: "Matara",
      email: "jp@gmail",
    },
    {
      name: "janindu",
      age: 21,
      address: "Matara",
      email: "jp@gmail",
    },

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
          backgroundColor: "lightsteelblue",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
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
