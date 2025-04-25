
import CreativeCard from '../components/CreativeCard';
import { Grid } from "@material-ui/core";
import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Store';
import tienda from '../api/tiendaMia';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


let dtFormat = new Intl.DateTimeFormat('default');

const OrderDetail = () => {
    const [state, dispatch] = useContext(Context);
    let order = state.selectedOrder || "";
    let items = state.items;
    
    useEffect(() => {
      const loadItems = async (order) => {
        const response = await tienda.items.getItemsByOrder(order.id);
        if(response.getItemsInOrder){
            dispatch({type:'SET_ITEMS',payload: response.getItemsInOrder });
        }else{
            dispatch({type:'SET_ERROR',payload: "error" });
        }
    };
      loadItems(order);
    }, []);
    
    return (
      <div className="App" >

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch',marginTop:'40px' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-read-only-input"
              label="Order Id"
              defaultValue={order.id}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Client"
              defaultValue={order.client}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Create Date"
              defaultValue={dtFormat.format(new Date(order.createDate))}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Shipping Promise"
              defaultValue={dtFormat.format(new Date(order.shippingPromise))}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="outlined-read-only-input"
              label="Status"
              defaultValue={order.status}
              InputProps={{
                readOnly: true,
            }}/>
            
            <TextField
              id="outlined-read-only-input"
              label="Shipping Address"
              defaultValue={order.shippingAddress}
              InputProps={{
                readOnly: true,
            }}/>

            
          </div>
        </Box>

        <h2>Items asociadosa la orden</h2>

        <Grid container spacing={5} marginTop='40px'
                justify={"center"}>
            
            {items.map((item,index) =>(
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <CreativeCard item={item}></CreativeCard>
                </Grid>
            ))}

        </Grid>

      </div> 
    );
}


export default OrderDetail;