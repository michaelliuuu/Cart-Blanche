import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Location of products.php
const PRODUCT_URL = 'http://localhost:8000/server/api/products.php';

export const ProductTable = () => {
  // Initialize useQueryClient to reload table when adding product
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(PRODUCT_URL);
      const data = await response.json();
      return data.map(product => ({
        id: product.id || product._id, // Use either id or _id
        name: product.name,
        price: product.price,
        category: product.category
      }));
    },
  });

  // Add product to the database
  const { mutateAsync: createProduct } = useMutation({
    mutationFn: async (newProduct) => {
      const response = await fetch(PRODUCT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          category: newProduct.category
        }),
      });
      const result = await response.json();
      return {
        id: result.id,  // The MongoDB-generated _id
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category
      };
    },
    // Refresh table when successfully added product
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    // Error when unable to add product
    onError: (error) => {
      alert('Failed to create product: ' + error.message);
    }
  });

  // Update product in database
  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: async (updatedProduct) => {
      const response = await fetch(PRODUCT_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // id: updatedProduct.id,
          name: updatedProduct.name,
          price: parseFloat(updatedProduct.price),
          category: updatedProduct.category
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      return response.json();
    },
    // Refresh table when successfully updated product
    onSuccess: () => queryClient.invalidateQueries(['products']),
    // Error when unable to update product
    onError: (error) => {
      alert('Failed to update product: ' + error.message);
    }
  });

  // Delete product mutation
  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(`${PRODUCT_URL}?id=${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
      return response.json();
    },
    // Refresh table when successfully deleted product
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    // Error when unable to delete product
    onError: (error) => {
      alert(`Delete failed: ${error.message}`);
    }
  });

  // Columns
  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'ID', enableEditing: false, size: 80 },
    { accessorKey: 'name', header: 'Name', size: 150 },
    { accessorKey: 'price', header: 'Price', size: 50 },
    { accessorKey: 'category', header: 'Category', size: 100 },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: products,
    enableEditing: true,
    getRowId: (row) => row.id,
    // Handle creating a new row
    onCreatingRowSave: async ({ values, exitCreatingMode }) => {
      await createProduct(values);
      exitCreatingMode();
    },
    // Handle editing a row
    onEditingRowSave: async ({ values, table }) => {
      try {
        await updateProduct(values);
        table.setEditingRow(null);
      } catch (error) {
        // console.error('Update error:', error);
      }
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            color="error" 
            onClick={() => {
              if (window.confirm('Delete this product?')) {
                deleteProduct(row.original.id);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      >
        Add Product
      </Button>
    ),
    state: { isLoading }
  });

  return <MaterialReactTable table={table} />;
};
