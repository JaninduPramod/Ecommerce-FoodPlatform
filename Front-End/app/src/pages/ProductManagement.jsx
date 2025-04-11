import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search term or products change
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.PRODUCT_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsNewProduct(false);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct({
      PRODUCT_ID: '',
      SUPPLIER_ID: '',
      CATEGORY_ID: '',
      NAME: '',
      IMAGE_URL: '',
      WEIGHT: '',
      STOCK: '',
      PRICE: ''
    });
    setIsNewProduct(true);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts(); // Refresh the list
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
      if (isNewProduct) {
        await createProduct(editingProduct);
      } else {
        await updateProduct(editingProduct);
      }
      setIsDialogOpen(false);
      fetchProducts(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ p: 3, mt: '100px' }}>
      <Typography variant="h5" gutterBottom>
        Product Management
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleAddClick}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
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
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {searchTerm ? 'No matching products found' : 'No products found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
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

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isNewProduct ? 'Add New Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Product ID"
              name="PRODUCT_ID"
              value={editingProduct?.PRODUCT_ID || ''}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={!isNewProduct}
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
            {isNewProduct ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;