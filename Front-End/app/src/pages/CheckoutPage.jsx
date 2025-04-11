import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };

  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v6/placeOrder",
        {}, // No body is required for this API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.msg === "Successfully Placed order ...") {
        alert("Order placed successfully!");
        navigate("/onboarding"); // Redirect to the homepage or another page
      } else {
        alert(response.data.msg || "Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpenCancelDialog(true); // Open the confirmation dialog
  };

  const handleCancelConfirm = () => {
    setOpenCancelDialog(false); // Close the dialog
    navigate("/onboarding"); // Redirect to the homepage
  };

  const handleCancelClose = () => {
    setOpenCancelDialog(false); // Close the dialog
  };

  return (
    <Box
      sx={{
        mt: "75px", // Adjusted to bring the content higher
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#333",
          textAlign: "center",
        }}
      >
        Checkout
      </Typography>

      {/* Cart Details */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: "95%", md: "80%" },
          padding: "30px",
          borderRadius: "12px",
          mb: 3,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#555",
          }}
        >
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                  Product
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map(item => (
                <TableRow key={item.CART_ID}>
                  <TableCell>{item.PRODUCT_NAME}</TableCell>
                  <TableCell align="right">
                    ${item.PRODUCT_PRICE.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">{item.QUANTITY}</TableCell>
                  <TableCell align="right">
                    ${(item.PRODUCT_PRICE * item.QUANTITY).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Total Price */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "right",
            mt: 2,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      </Paper>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#ff7d01",
            color: "white",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#e66a00" },
          }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{
            fontWeight: "bold",
            borderColor: "#ff7d01",
            color: "#ff7d01",
            ":hover": { backgroundColor: "#ffe6d5", borderColor: "#ff7d01" },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCancelClose}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">Cancel Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel the checkout process? Your cart
            items will remain saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="primary">
            No
          </Button>
          <Button
            onClick={handleCancelConfirm}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutPage;
