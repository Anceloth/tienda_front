import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";
import Store from "../context/Store";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Store>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Orders} />
              <Route exact path="/detail/" component={OrderDetail} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </LocalizationProvider>
        </Store>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
