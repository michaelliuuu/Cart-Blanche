import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const mockProducts = [
  { id: '1', name: 'Product A', price: 10, category: 'Electronics' },
  { id: '2', name: 'Product B', price: 20, category: 'Clothing' },
];

export const ProductTable = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockProducts;
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });

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
    state: { isLoading },
  });

  return <MaterialReactTable table={table} />;
};