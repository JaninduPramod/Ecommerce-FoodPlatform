import React, { useEffect, useState } from 'react';
import './Admin.css';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  getProducts,
  getCustomers,
  getSuppliers,
  getFeedback,
  deleteFeedback
} from '../services/api';
import {
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon,
  Feedback as FeedbackIcon,
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ProductManagement from './ProductManagement';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    suppliers: 0,
    feedback: 0,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [tableData, setTableData] = useState({
    products: [],
    customers: [],
    suppliers: [],
    feedback: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, customersRes, suppliersRes, feedbackRes] = await Promise.all([
          getProducts(),
          getCustomers(),
          getSuppliers(),
          getFeedback(),
        ]);

        const products = Array.isArray(productsRes) ? productsRes : (productsRes?.data || productsRes?.msg || []);
        const customers = Array.isArray(customersRes) ? customersRes : (customersRes?.data || customersRes?.msg || []);
        const suppliers = Array.isArray(suppliersRes) ? suppliersRes : (suppliersRes?.data || suppliersRes?.msg || []);
        const feedback = Array.isArray(feedbackRes) ? feedbackRes : (feedbackRes?.data || feedbackRes?.msg || []);

        setAllProducts(products);
        setStats({
          products: products.length,
          customers: customers.length,
          suppliers: suppliers.length,
          feedback: feedback.length,
        });

        setTableData({
          products: products.slice(0, 5),
          customers: customers.slice(0, 5),
          suppliers: suppliers.slice(0, 5),
          feedback: feedback.slice(0, 5)
        });

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Failed to fetch data from server');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Product Category Chart Data (using all products)
  const productCategoryChartData = {
    labels: allProducts.reduce((categories, product) => {
      const category = `Category ${product.CATEGORY_ID || product.categoryId}`;
      if (!categories.includes(category)) {
        categories.push(category);
      }
      return categories;
    }, []),
    datasets: [
      {
        label: 'Products per Category',
        data: allProducts.reduce((counts, product) => {
          const category = `Category ${product.CATEGORY_ID || product.categoryId}`;
          counts[category] = (counts[category] || 0) + 1;
          return counts;
        }, {}),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Product Stock by Category Chart (using all products)
  const productStockChartData = {
    labels: allProducts.reduce((categories, product) => {
      const category = `Category ${product.CATEGORY_ID || product.categoryId}`;
      if (!categories.includes(category)) {
        categories.push(category);
      }
      return categories;
    }, []),
    datasets: [
      {
        label: 'Total Stock per Category',
        data: allProducts.reduce((stocks, product) => {
          const category = `Category ${product.CATEGORY_ID || product.categoryId}`;
          stocks[category] = (stocks[category] || 0) + (product.STOCK || product.stock || 0);
          return stocks;
        }, {}),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const productChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Distribution',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const StatCard = ({ icon, title, value, color }) => (
    <Paper sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      backgroundColor: color, 
      color: 'white',
      margin: '0px'
    }}>
      {icon}
      <Typography variant="h6" sx={{ mt: 1 }}>{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {loading ? <CircularProgress size={24} color="inherit" /> : value}
      </Typography>
    </Paper>
  );

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDeleteClick = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!feedbackToDelete) return;
    
    try {
      await deleteFeedback(feedbackToDelete);
      const feedbackRes = await getFeedback();
      const feedbackData = Array.isArray(feedbackRes) ? feedbackRes : 
                        (feedbackRes?.data || feedbackRes?.msg || []);
      setTableData(prev => ({
        ...prev,
        feedback: feedbackData.slice(0, 5)
      }));
      setStats(prev => ({
        ...prev,
        feedback: feedbackData.length
      }));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError(error.message || 'Failed to delete feedback');
      setDeleteDialogOpen(false);
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 3, marginTop: '50px' }}>
        <Alert severity="error">
          Failed to load dashboard data: {error}
          <br />
          Please check your backend server and API endpoints.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, margin: '100px 20px 20px 20px' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Admin Dashboard</Typography>
      
      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" icon={<DashboardIcon />} iconPosition="start" />
        <Tab label="Product Management" icon={<EditIcon />} iconPosition="start" />
      </Tabs>

      {currentTab === 0 ? (
        <>
          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<ShoppingCartIcon sx={{ fontSize: 40 }} />}
                title="Products"
                value={stats.products}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                title="Customers"
                value={stats.customers}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<LocalShippingIcon sx={{ fontSize: 40 }} />}
                title="Suppliers"
                value={stats.suppliers}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<FeedbackIcon sx={{ fontSize: 40 }} />}
                title="Feedback"
                value={stats.feedback}
                color="#f44336"
              />
            </Grid>
          </Grid>

          {/* Dual Product Charts Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Products by Category</Typography>
                <Box sx={{ height: '300px' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : allProducts.length > 0 ? (
                    <Bar data={productCategoryChartData} options={productChartOptions} />
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      color: 'text.secondary'
                    }}>
                      <InventoryIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h6">No product data available</Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Stock by Category</Typography>
                <Box sx={{ height: '300px' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : allProducts.length > 0 ? (
                    <Bar data={productStockChartData} options={productChartOptions} />
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      color: 'text.secondary'
                    }}>
                      <InventoryIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h6">No stock data available</Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Tables Section */}
          <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>Recent Data Overview</Typography>
          
          {/* Products Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Products</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : tableData.products.length > 0 ? (
                    tableData.products.map((product) => (
                      <TableRow key={product.PRODUCT_ID || product.id}>
                        <TableCell>{product.PRODUCT_ID || product.id}</TableCell>
                        <TableCell>{product.NAME || product.name}</TableCell>
                        <TableCell>{product.CATEGORY_ID || product.categoryId}</TableCell>
                        <TableCell>${product.PRICE || product.price}</TableCell>
                        <TableCell>{product.STOCK || product.stock}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Customers Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Customers</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : tableData.customers.length > 0 ? (
                    tableData.customers.map((customer) => (
                      <TableRow key={customer.CUSTOMER_ID || customer.id}>
                        <TableCell>{customer.CUSTOMER_ID || customer.id}</TableCell>
                        <TableCell>{customer.FULL_NAME || customer.fullName}</TableCell>
                        <TableCell>{customer.PHONE || customer.phone}</TableCell>
                        <TableCell>{customer.ADDRESS || customer.address}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No customers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Suppliers Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Suppliers</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : tableData.suppliers.length > 0 ? (
                    tableData.suppliers.map((supplier) => (
                      <TableRow key={supplier.SUPPLIER_ID || supplier.id}>
                        <TableCell>{supplier.SUPPLIER_ID || supplier.id}</TableCell>
                        <TableCell>{supplier.FULL_NAME || supplier.fullName}</TableCell>
                        <TableCell>{supplier.PHONE || supplier.phone}</TableCell>
                        <TableCell>{supplier.ADDRESS || supplier.address}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No suppliers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Feedback Table with Delete Action */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Feedback</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Product ID</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : tableData.feedback.length > 0 ? (
                    tableData.feedback.map((feedback) => (
                      <TableRow key={feedback.FEEDBACK_ID || feedback.id}>
                        <TableCell>{feedback.FEEDBACK_ID || feedback.id}</TableCell>
                        <TableCell>{feedback.PRODUCT_ID || feedback.productId}</TableCell>
                        <TableCell>{feedback.USER_ID || feedback.userId}</TableCell>
                        <TableCell>{feedback.MESSAGE || feedback.message}</TableCell>
                        <TableCell>{feedback.TYPE || feedback.type}</TableCell>
                        <TableCell>
                          <IconButton 
                            onClick={() => handleDeleteClick(feedback.FEEDBACK_ID || feedback.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No feedback found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      ) : (
        <ProductManagement />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this feedback?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
           
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;