import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'order_type',
    headerName: 'Type',
    width: 120,
  },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 120,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 120,
  },
  {
    field: 'address_line_1',
    headerName: 'Address',
    width: 200,
  },
  {
    field: 'tip',
    headerName: 'Tip',
    type: 'number',
    width: 100,
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
  },
  {
    field: 'created_at',
    headerName: 'Created at',
    width: 300,
  },
  {
    field: 'schedule',
    headerName: 'Scheduled time',
    width: 180,
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

export default function Orders() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await axiosPrivate
        .get('/order/all')
        .then((response) => {
          setRows(response.data);
        })
        .catch((e) => setMessage(e.response.data.detail));
    };
    fetchOrders();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          sortModel={[
            {
              field: 'id',
              sort: 'desc',
            },
          ]}
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            navigate(`/order/${params.id}`);
          }}
        />
        {message && <div className={classes.message}>{message}</div>}
      </div>
    </React.Fragment>
  );
}
