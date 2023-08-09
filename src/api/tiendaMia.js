import axios from 'axios';

const urlTienda = "http://localhost:3030/graphql";

const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
});

const tienda = {
  orders: {
    getOrder: async (payload) => {
        throw new Error("Method not implemented");
    },
    
    getOrderList:  async (status)=>{
      console.log(`${urlTienda}`);

      const query_graphql = `{
        getOrdersList(status: "${status || ""}"){
          id,
          client,
          createDate,
          status,
          shippingAddress,
          shippingPromise,
          itemsOrder{
            id,
            idItem,
            idOrder
          }
        }
      }`;

      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlTienda,
          method: 'POST',
          data: {
            query: query_graphql,
          },
        })

        console.log("from tienda:", response.data.data);
        return await response.data.data;
        
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  items:{
    getItemsByOrder : async (order) => {

      const query_graphql = `{
        getItemsInOrder(order: "${order || ""}"){
          id,
          title,
          description,
          sku,
          quantity,
          url,
          price
        }
      }`;

      console.log(`Getting Items from order: ${order}`)
      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlTienda,
          method: 'POST',
          data: {
            query: query_graphql,
          },
        })

        console.log("Items from tienda:", response.data.data);
        return await response.data.data;
        
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default tienda;

