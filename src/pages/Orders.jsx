
import SearchBar from '../components/SearchBar'
import { Box, Grid } from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect } from 'react';
import React, { Context } from '../context/Store';
import tienda from '../api/tiendaMia';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles((theme) => ({
    gridContainer:{
        paddingLeft: "2em",
        paddingRight: "2em",
    },
    root: {
        marginBottom: '30px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 8,
      },
      divider: {
        height: 28,
        margin: 4,
      },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'client',
    headerName: 'Client',
    width: 150,
    editable: true,
  },
  {
    field: 'createDate',
    headerName: 'Created',
    sortable: false,
    width: 220,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'shippingAddress',
    headerName: 'address',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'shippingPromise',
    headerName: 'Shipping Promise',
    description: 'This is the date will be shipping.',
    sortable: false,
    width: 220,
  },
];

const Orders = () => {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    console.log(" Page :",state.page);

    const getDetails = (e) =>{
      console.log("Getting details E: ", e.row);
      dispatch({type:'SET_ORDER',payload: { order: e.row}});
      
      /* 
       * We can change this way to pass the order to the next page
       * using instead OrderDetail as child component and passing the order as props
       * by props
       */
      history.push({
        pathname: `/detail`,
        // state:{order: e.row}
      });
      
    }

    const classes = useStyles();
    
    useEffect(() => {

      const loadOrders = (status) => {
        tienda.orders.getOrderList(status).then(response => {
          console.log("response: ", response.getOrdersList);
          if(response.getOrdersList){
              console.log("Inside success ")
              dispatch({type:'SET_ORDERS',payload: response.getOrdersList });
          }else{
            console.log("Inside Error ")
            dispatch({type:'SET_ERROR',payload: "error" });
          }
        });
      };

      loadOrders("");
      
    }
    , []);
    
    const orderList = state.filterList;
    return (
      <div className="App" >
        <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
            <SearchBar></SearchBar>
        </Grid>

        <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={orderList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              onRowClick={getDetails}
            />
          </Box>
        </Grid>
      </div> 
    );
}


export default Orders;