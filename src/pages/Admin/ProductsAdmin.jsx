import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const useStyles = makeStyles((theme) => ({
  message: {
    color: '#ff3333',
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '12px',
    textAlign: 'center',
  },
  addButton: {
    marginBottom: 10,
  },
}));

// data validation for row update
const useFakeMutation = () => {
  return React.useCallback(
    (item) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.name?.trim() === '') {
            reject(
              new Error("Error while saving product: name can't be empty.")
            );
          } else if (item.category?.trim() === '') {
            reject(
              new Error("Error while saving product: category can't be empty.")
            );
          } else if (item.price === null) {
            reject(
              new Error("Error while saving product: price can't be empty.")
            );
          } else if (item.cost === null) {
            reject(
              new Error("Error while saving product: cost can't be empty.")
            );
          } else if (item.inventory === null) {
            reject(
              new Error("Error while saving product: inventory can't be empty.")
            );
          } else if (item.popularity === null) {
            reject(
              new Error(
                "Error while saving product: popularity can't be empty."
              )
            );
          } else {
            resolve({ ...item });
          }
        }, 200);
      }),
    []
  );
};

export default function ProductsAdmin() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'sku', headerName: 'SKU', width: 120, editable: true },
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
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Spirits',
        'Wine',
        'Beer & Seltzers',
        'Non-alcoholic',
        'Other',
      ],
    },
    {
      field: 'subcategory',
      headerName: 'Subcategory',
      width: 140,
      editable: true,
      type: 'singleSelect',
      valueOptions: ({ row }) => {
        if (row.category === 'Spirits') {
          return [
            'Cognac',
            'Scotch',
            'Bourbon',
            'Gin',
            'Japanese Whiskey',
            'Canadian Whiskey',
            'Tequila',
            'Rum',
            'Brandy',
            'Vodka',
            'Sake',
            'Liqueurs',
            'Cocktails',
            'Other',
          ];
        } else if (row.category === 'Beer & Seltzers') {
          return ['Domestic Beer', 'Import Beer', 'Hard Seltzers', 'Other'];
        } else if (row.category === 'Wine') {
          return [
            'Cabernet Sauvignon',
            'Pinot Noir',
            'Malbec',
            'Merlot',
            'Zinfandel',
            'Moscato',
            'Chardonnay',
            'Sauvignon Blanc',
            'Pinot Grigio',
            'Riesling',
            'Champagne',
            'Sparkling Wine',
            'Blush Rose',
            'Other',
          ];
        }
        return ['Other'];
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 170,
      editable: true,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'popularity',
      headerName: 'Popularity',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 140,
      editable: false,
      renderCell: ({ row }) => {
        if (row.image) {
          return row.image;
        } else {
          return (
            <Button
              variant='contained'
              color='primary'
              component='label'
              startIcon={<PhotoCamera />}
              onClick={() => {
                setIdUploadImg(row.id);
                setOpenUploadImg(true);
              }}
            >
              Upload
            </Button>
          );
        }
      },
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      width: 160,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        // Convert the timestamp to readable datetime
        const [year, month, date, time] = params.value.split(/[-T.]/);
        return month + '/' + date + '/' + year + ' ' + time;
      },
    },
    {
      field: 'actions',
      headerName: 'Delete',
      width: 120,
      renderCell: ({ row }) => {
        return (
          <IconButton
            aria-label='delete'
            onClick={() => {
              setIdDelete(row.id);
              setOpenDelete(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const mutateRow = useFakeMutation();
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  // control dialogs open/close
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUploadImg, setOpenUploadImg] = useState(false);
  // id of the item being modified
  const [idDelete, setIdDelete] = useState(null);
  const [idUploadImg, setIdUploadImg] = useState(null);
  // form inputs for adding a new item
  const [newItem, setNewItem] = useState({});

  const [uploadFile, setUploadFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    await axiosPrivate
      .get('/products/admin')
      .then((response) => {
        setRows(response.data);
      })
      .catch((e) =>
        setSnackbar({ children: e.response.data.detail, severity: 'error' })
      );
  }, [axiosPrivate]);

  const handleRowUpdateCommit = useCallback(
    async (newRow) => {
      const response = await mutateRow(newRow);
      await axiosPrivate
        .put(`/products/${newRow.id}`, newRow)
        .then((response) => {
          setSnackbar({
            children: response.data.msg,
            severity: 'success',
          });
        })
        .catch((e) => {
          setSnackbar({ children: e.response.data.detail, severity: 'error' });
        });
      return response;
    },
    [axiosPrivate, mutateRow]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleCellDelete = async () => {
    await axiosPrivate
      .delete(`/products/${idDelete}`)
      .then((response) =>
        setSnackbar({
          children: 'Successfully deleted item',
          severity: 'success',
        })
      )
      .catch((e) =>
        setSnackbar({ children: e.response.data.detail, severity: 'error' })
      );
  };

  const handleCellAdd = async () => {
    await axiosPrivate
      .post('/products', newItem)
      .then(async (response) => {
        setSnackbar({
          children: response.data.msg,
          severity: 'success',
        });
        if (uploadFile) {
          let fd = new FormData();
          fd.append('file', uploadFile);
          await axiosPrivate
            .post('/products/image', fd, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              setSnackbar({
                children: response.data.msg,
                severity: 'success',
              });
            })
            .catch((e) =>
              setSnackbar({
                children: e.response.data.detail,
                severity: 'error',
              })
            );
          setUploadFile(null);
        }
      })
      .catch((e) =>
        setSnackbar({ children: e.response.data.detail, severity: 'error' })
      );
    setNewItem({});
  };

  const handleUploadImageCommit = async () => {
    await axiosPrivate
      .put(`/products/${idUploadImg}`, { image: uploadFile.name })
      .then(async (response) => {
        setSnackbar({
          children: response.data.msg,
          severity: 'success',
        });
        let fd = new FormData();
        fd.append('file', uploadFile);
        await axiosPrivate
          .post('/products/image', fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setSnackbar({
              children: response.data.msg,
              severity: 'success',
            });
          })
          .catch((e) =>
            setSnackbar({ children: e.response.data.detail, severity: 'error' })
          );
        setUploadFile(null);
      })
      .catch((e) =>
        setSnackbar({ children: e.response.data.detail, severity: 'error' })
      );
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setNewItem((prev) => ({ ...prev, image: file.name }));
    setUploadFile(file);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <React.Fragment>
      <Title>All Products</Title>
      <Button
        style={{ maxWidth: '150px' }}
        variant='contained'
        color='primary'
        className={classes.addButton}
        startIcon={<AddIcon />}
        onClick={() => setOpenAdd(true)}
      >
        Add Item
      </Button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnSelector
          disableDensitySelector
          processRowUpdate={handleRowUpdateCommit}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'id',
                  sort: 'desc',
                },
              ],
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500, variant: 'outlined' },
            },
          }}
        />
      </div>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Delete Item {idDelete}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete item:{' '}
            {rows.find((element) => element.id === idDelete)?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDelete(false)}
            variant='contained'
            color='secondary'
          >
            Back
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              await handleCellDelete();
              setIdDelete(null);
              setOpenDelete(false);
              setIsLoading(false);
              await fetchProducts();
            }}
            disabled={isLoading}
            variant='contained'
            color='primary'
          >
            <span>{isLoading ? <CircularProgress /> : 'Yes'}</span>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setUploadFile(null);
          setNewItem({});
        }}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Item</DialogTitle>
        <DialogContent>
          <form
            className={classes.form}
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              await handleCellAdd();
              setOpenAdd(false);
              setIsLoading(false);
              await fetchProducts();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  fullWidth
                  label='SKU'
                  value={newItem.sku ? newItem.sku : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      sku: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  label='Name'
                  value={newItem.name ? newItem.name : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  label='Size'
                  value={newItem.size ? newItem.size : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, size: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  fullWidth
                  type='number'
                  label='Cost'
                  value={newItem.cost ? newItem.cost : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, cost: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  type='number'
                  label='Price'
                  value={newItem.price ? newItem.price : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  label='Inventory'
                  value={newItem.inventory ? newItem.inventory : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      inventory: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  label='Popularity'
                  value={newItem.popularity ? newItem.popularity : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      popularity: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Category</InputLabel>
                  <Select
                    required
                    value={newItem.category ? newItem.category : ''}
                    label='Category'
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value={'Beer & Seltzers'}>
                      Beer & Seltzers
                    </MenuItem>
                    <MenuItem value={'Spirits'}>Spirits</MenuItem>
                    <MenuItem value={'Wine'}>Wine</MenuItem>
                    <MenuItem value={'Non-alcoholic'}>Non-alcoholic</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  fullWidth
                  label='Subcategory'
                  value={newItem.subcategory ? newItem.subcategory : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      subcategory: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  fullWidth
                  label='Description'
                  value={newItem.description ? newItem.description : ''}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='primary'
                  component='label'
                  startIcon={<PhotoCamera />}
                >
                  Upload Image
                  <input
                    accept='image/*'
                    id='contained-button-file'
                    hidden
                    type='file'
                    onChange={handleFileUpload}
                  />
                </Button>
                {uploadFile ? uploadFile.name : ''}
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenAdd(false);
                  setUploadFile(null);
                  setNewItem({});
                }}
                variant='contained'
                color='secondary'
              >
                Back
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isLoading}
              >
                <span>{isLoading ? <CircularProgress /> : 'Add'}</span>
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUploadImg}
        onClose={() => setOpenUploadImg(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Upload Image for:{' '}
            {rows.find((element) => element.id === idDelete)?.name}
          </DialogContentText>
          <Button
            variant='contained'
            color='primary'
            component='label'
            startIcon={<PhotoCamera />}
          >
            Upload Image
            <input
              accept='image/*'
              id='contained-button-file'
              hidden
              type='file'
              onChange={(e) => {
                setUploadFile(e.target.files[0]);
              }}
            />
          </Button>
          {uploadFile ? uploadFile.name : ''}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenUploadImg(false)}
            variant='contained'
            color='secondary'
          >
            Back
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              await handleUploadImageCommit();
              setIdUploadImg(null);
              setOpenUploadImg(false);
              setIsLoading(false);
              await fetchProducts();
            }}
            disabled={isLoading || !uploadFile}
            variant='contained'
            color='primary'
          >
            <span>{isLoading ? <CircularProgress /> : 'Submit'}</span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
