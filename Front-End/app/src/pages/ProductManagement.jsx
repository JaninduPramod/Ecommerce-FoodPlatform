import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TablePagination
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { getProducts, updateProduct, deleteProduct } from '../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        String(product.PRODUCT_ID).toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(0); // Reset to first page when search changes
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      const productsArray = Array.isArray(response) ? response : [];
      setProducts(productsArray);
      setFilteredProducts(productsArray);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateProduct(editingProduct);
      setIsDialogOpen(false);
      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  // Calculate the products to display on the current page
  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3, mt: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Product Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ width: '300px' }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {searchTerm ? 'No matching products found' : 'No products found'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.PRODUCT_ID}>
                  <TableCell>{product.PRODUCT_ID}</TableCell>
                  <TableCell>{product.NAME}</TableCell>
                  <TableCell>{product.CATEGORY_ID}</TableCell>
                  <TableCell>${product.PRICE}</TableCell>
                  <TableCell>{product.STOCK}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(product)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(product.PRODUCT_ID)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Product ID"
              name="PRODUCT_ID"
              value={editingProduct?.PRODUCT_ID || ''}
              disabled
              fullWidth
            />
            <TextField
              label="Name"
              name="NAME"
              value={editingProduct?.NAME || ''}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Category ID"
              name="CATEGORY_ID"
              value={editingProduct?.CATEGORY_ID || ''}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Supplier ID"
              name="SUPPLIER_ID"
              value={editingProduct?.SUPPLIER_ID || ''}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Price"
              name="PRICE"
              type="number"
              value={editingProduct?.PRICE || ''}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Stock"
              name="STOCK"
              type="number"
              value={editingProduct?.STOCK || ''}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Weight"
              name="WEIGHT"
              value={editingProduct?.WEIGHT || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="IMAGE_URL"
              value={editingProduct?.IMAGE_URL || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;