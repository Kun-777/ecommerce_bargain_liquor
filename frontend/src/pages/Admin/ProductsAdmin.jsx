import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 120,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 140,
    editable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'inventory',
    headerName: 'Inventory',
    type: 'number',
    width: 140,
    editable: true,
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 140,
    editable: true,
  },
  {
    field: 'created_at',
    headerName: 'Created at',
    width: 300,
  },
];

const useStyles = makeStyles((theme) => ({
  message: {
    color: '#ff3333',
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '12px',
    textAlign: 'center',
  },
}));

export default function ProductsAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await axiosPrivate
        .get('/products/admin')
        .then((response) => {
          setRows(response.data);
        })
        .catch((e) => setMessage(e.response.data.detail));
    };
    fetchOrders();
  }, []);

  const handleCellEditCommit = useCallback(
    async ({ id, field, value }) => {
      let rowToUpdate = rows.find((r) => r.id === id);
      rowToUpdate[field] = value;
      await axiosPrivate
        .put(`/products/${id}`, rowToUpdate)
        .then((response) => {
          alert(response.data.msg);
        })
        .catch((e) => setMessage(e.response.data.detail));
    },
    [rows]
  );

  return (
    <React.Fragment>
      <Title>All Products</Title>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          pageSize={10}
          onCellEditCommit={handleCellEditCommit}
        />
        {message && <div className={classes.message}>{message}</div>}
      </div>
    </React.Fragment>
  );
}
