import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  Button,
  useTheme
} from '@mui/material';
import {
  getProducts,
  getCustomers,
  getSuppliers,
  getFeedback,
} from '../services/api';
import {
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon,
  Feedback as FeedbackIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

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
      {value === undefined ? <CircularProgress size={24} color="inherit" /> : value}
    </Typography>
  </Paper>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  color: PropTypes.string.isRequired,
};

const DataTable = ({ data, columns, loading, title }) => {
  const theme = useTheme();
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 1 }}>
        <Typography>No {title.toLowerCase()} data available</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label={`${title} table`}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={{ fontWeight: 'bold' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={`${row.id || index}_${Math.random().toString(36).substr(2, 9)}`}>
              {columns.map((column) => (
                <TableCell key={`${column.key}_${index}`}>
                  {column.format ? column.format(row[column.key]) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    products: undefined,
    customers: undefined,
    suppliers: undefined,
    feedback: undefined,
  });
  const [tableData, setTableData] = useState({
    products: [],
    customers: [],
    suppliers: [],
    feedback: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [products, customers, suppliers, feedback] = await Promise.all([
        getProducts().catch(() => []),
        getCustomers().catch(() => []),
        getSuppliers().catch(() => []),
        getFeedback().catch(() => []),
      ]);

      setStats({
        products: products?.length || 0,
        customers: customers?.length || 0,
        suppliers: suppliers?.length || 0,
        feedback: feedback?.length || 0,
      });

      setTableData({
        products: (products || []).slice(0, 5),
        customers: (customers || []).slice(0, 5),
        suppliers: (suppliers || []).slice(0, 5),
        feedback: (feedback || []).slice(0, 5)
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to fetch data from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 3, marginTop: '20px' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load dashboard data: {error}
        </Alert>
        <Button 
          variant="contained" 
          startIcon={<RefreshIcon />}
          onClick={fetchStats}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const productColumns = [
    { key: 'PRODUCT_ID', label: 'ID' },
    { key: 'NAME', label: 'Name' },
    { key: 'CATEGORY_ID', label: 'Category' },
    { 
      key: 'PRICE', 
      label: 'Price',
      format: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value)
    },
    { key: 'STOCK', label: 'Stock' }
  ];

  const customerColumns = [
    { key: 'CUSTOMER_ID', label: 'ID' },
    { key: 'FULL_NAME', label: 'Name' },
    { key: 'PHONE', label: 'Phone' },
    { key: 'ADDRESS', label: 'Address' }
  ];

  const supplierColumns = [
    { key: 'SUPPLIER_ID', label: 'ID' },
    { key: 'FULL_NAME', label: 'Name' },
    { key: 'PHONE', label: 'Phone' },
    { key: 'ADDRESS', label: 'Address' }
  ];

  const feedbackColumns = [
    { key: 'FEEDBACK_ID', label: 'ID' },
    { key: 'PRODUCT_ID', label: 'Product ID' },
    { key: 'USER_ID', label: 'User ID' },
    { key: 'MESSAGE', label: 'Message' },
    { key: 'TYPE', label: 'Type' }
  ];

  return (
    <Box sx={{ p: 3, marginTop: '20px' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4">Dashboard Overview</Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />}
          onClick={fetchStats}
          disabled={loading}
        >
          Refresh Data
        </Button>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ShoppingCartIcon sx={{ fontSize: 40 }} />}
            title="Products"
            value={stats.products}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            title="Customers"
            value={stats.customers}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LocalShippingIcon sx={{ fontSize: 40 }} />}
            title="Suppliers"
            value={stats.suppliers}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<FeedbackIcon sx={{ fontSize: 40 }} />}
            title="Feedback"
            value={stats.feedback}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>Recent Data Overview</Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Products</Typography>
        <DataTable 
          data={tableData.products} 
          columns={productColumns} 
          loading={loading && tableData.products.length === 0}
          title="Products"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Customers</Typography>
        <DataTable 
          data={tableData.customers} 
          columns={customerColumns} 
          loading={loading && tableData.customers.length === 0}
          title="Customers"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Suppliers</Typography>
        <DataTable 
          data={tableData.suppliers} 
          columns={supplierColumns} 
          loading={loading && tableData.suppliers.length === 0}
          title="Suppliers"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Feedback</Typography>
        <DataTable 
          data={tableData.feedback} 
          columns={feedbackColumns} 
          loading={loading && tableData.feedback.length === 0}
          title="Feedback"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;