const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state,
                orderList: action.payload,
                filterList: action.payload,
            };
        case 'SET_ORDER':
            return {
                ...state,
                selectedOrder: action.payload.order,
                imgChar: action.payload.img
            };
        case 'FILTER_ORDERS':
            return {
                ...state,
                filterList: state.orderList.filter( (order) => 
                            order.status.toLowerCase().includes(action.payload.toLowerCase())
                            )
            };
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;