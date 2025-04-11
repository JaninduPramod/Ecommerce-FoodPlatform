import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const CartDialog = ({ open, onClose, cartItems, setCartItems }) => {
  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.PRODUCT_PRICE * item.QUANTITY,
    0,
  );

  // Function to remove an item from the cart
  const removeItem = async cartId => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3000/api/v6/deleteCartItem", {
        headers: { Authorization: `Bearer ${token}` },
        data: { CART_ID: cartId },
      });

      // Update the cartItems state after successful deletion
      setCartItems(prevItems =>
        prevItems.filter(item => item.CART_ID !== cartId),
      );
      alert("Item removed from the cart successfully.");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove the item. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          height: "80vh",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Your Shopping Cart</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <TableRow key={item.CART_ID}>
                    <TableCell>{item.PRODUCT_NAME}</TableCell>
                    <TableCell align="right">
                      ${item.PRODUCT_PRICE.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{item.QUANTITY}</TableCell>
                    <TableCell align="right">
                      ${(item.PRODUCT_PRICE * item.QUANTITY).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeItem(item.CART_ID)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Your cart is empty
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: 3 }}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
