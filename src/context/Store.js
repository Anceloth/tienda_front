import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

import PropTypes from "prop-types";

const initialState = {
    orderList: [],
    filterList:[],
    items:[],
    selectedOrder: null,
    selectedItem: null,
    page:1,
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;

Store.propTypes = {
    children: PropTypes.any.isRequired,
};