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
  Chip,
  LinearProgress,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CheckCircle as CheckCircleIcon,
  WatchLater as WatchLaterIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { green, orange, blue, red } from "@mui/material/colors";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle payment
  const handlePayment = async orderId => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ORDER_ID: orderId,
        }),
      });

      const data = await response.json();
      if (data.msg == "Payment Done Successfully ...") {
        alert("Payment Done Successfully ...");
      } else {
        alert("Payment Failed ...");
      }
      console.log("Payment response:", data.msg);
    } catch (exception) {
      console.log(exception);
    }
  };

  // Function to handle order cancellation
  const cancelOrder = async orderId => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/cancelOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ORDER_ID: orderId,
        }),
      });

      const data = await response.json();

      if (data.msg == "Order Cancelled Successfully !!") {
        alert("Order Cancelled Successfully ...");
        fetchOrders();
      }

      console.log("Response:", data.msg);
    } catch (exception) {
      console.log(exception);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/v7/orderDetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (data.msg && Array.isArray(data.msg)) {
        setOrders(data.msg);
      } else {
        console.log("No orders found or invalid response format.");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderStatusChip = status => {
    switch (status) {
      case "Processing":
        return (
          <Chip
            icon={<WatchLaterIcon />}
            label="Processing"
            sx={{ backgroundColor: orange[100], color: orange[800] }}
          />
        );
      case "Completed":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Completed"
            sx={{ backgroundColor: green[100], color: green[800] }}
          />
        );
      case "Shipped":
        return (
          <Chip
            icon={<LocalShippingIcon />}
            label="Shipped"
            sx={{ backgroundColor: blue[100], color: blue[800] }}
          />
        );
      case "Failed":
        return (
          <Chip
            icon={<PaymentIcon />}
            label="Failed"
            sx={{ backgroundColor: red[100], color: red[800] }}
          />
        );
      default:
        return (
          <Chip
            icon={<WatchLaterIcon />}
            label={status}
            sx={{ backgroundColor: orange[100], color: orange[800] }}
          />
        );
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No Orders Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You haven't placed any orders yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        mt: "140px",
        marginBottom: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        My Orders
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Total Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Payment Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delivery Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow
                key={order.ORDER_ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                      <ReceiptIcon />
                    </Avatar>
                    #{order.ORDER_ID}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${order.TOTAL_PRICE.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>{renderStatusChip(order.PAYMENT_STATUS)}</TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {order.ESTIMATED_DATE}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, fontWeight: "bold" }}
                    onClick={() => handlePayment(order.ORDER_ID)}
                  >
                    Pay Now
                  </Button>
                  <Button
                    sx={{ fontWeight: "bold" }}
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => cancelOrder(order.ORDER_ID)}
                  >
                    Cancel Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: { xs: "block", md: "none" }, mt: 3 }}>
        {orders.map(order => (
          <Paper key={order.ORDER_ID} elevation={2} sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Order #{order.ORDER_ID}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                ${order.TOTAL_PRICE.toLocaleString()}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Payment Status:
              </Typography>
              {renderStatusChip(order.PAYMENT_STATUS)}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="body2" color="text.secondary">
                Delivery Date:
              </Typography>
              <Typography variant="body2">{order.ESTIMATED_DATE}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" size="small" fullWidth>
                Details
              </Button>
              <Button variant="contained" size="small" fullWidth>
                Track
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OrdersPage;
