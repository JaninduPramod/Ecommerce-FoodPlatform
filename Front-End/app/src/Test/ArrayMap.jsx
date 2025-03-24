import { Container, Box, Typography, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";

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
        <Typography variant="h5">{Person.CUSTOMER_ID}</Typography>
        <Typography variant="h5">{Person.CUSTOMER_NAME}</Typography>
        <Typography variant="h5">{Person.CUSTOMER_AGE}</Typography>
        <Typography variant="h5">{Person.CUSTOMER_EMAIL}</Typography>
      </Paper>
    </>
  );
};

const MappingDiv = () => {
  const [customers, setCustomers] = useState([]);

  const cardMapper = async () => {
    const res = await fetch("http://localhost:3000/api/v1/allcustomers");

    const data = await res.json();
    setCustomers(data.customers);

    console.log(customers);
  };

  useEffect(() => {
    cardMapper();
  }, []);

  return (
    <>
      <div>
        <Box
          sx={{
            backgroundColor: "black",
            mt: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mt: "25px",
              // backgroundColor: "#121212",
              width: "75%",
              height: "50%",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {customers.map((customer, index) => (
              <CardLayout key={index} Person={customer} />
            ))}
          </Box>
        </Box>
        <Button
          sx={{
            width: "fit-content",

            border: "1px solid black",
          }}
          onClick={cardMapper}
        >
          Click
        </Button>
      </div>
    </>
  );
};
export default MappingDiv;
