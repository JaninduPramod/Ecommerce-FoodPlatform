import React from "react";
import { Box, TextField } from "@mui/material";

const PersonForm = ({ person1 }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      border: "1px solid red",
      height: "300px",
      padding: "8px",
    }}
  >
    <TextField
      label="Name"
      value={person1.pName}
      InputProps={{ style: { color: "black" } }}
    />
    <TextField
      label="Age"
      value={person1.pAge}
      InputProps={{ style: { color: "black" } }}
    />
    <TextField
      label="Address"
      value={person1.address}
      InputProps={{ style: { color: "black" } }}
    />
  </Box>
);

const MappingPage = () => {
  const persons = [
    { pName: "janindu", pAge: 18, address: "matara" },
    { pName: "pramod", pAge: 20, address: "colombo" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      {persons.map(person => (
        <PersonForm person1={person} />
      ))}
    </Box>
  );
};

export default MappingPage;
