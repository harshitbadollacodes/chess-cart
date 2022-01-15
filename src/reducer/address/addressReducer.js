export const initialState = {
    addresses: [],
    shippingAddress: null
};

export function addressReducer(state, action) {
    switch (action.type) {
        case "LOAD_ADDRESSES":
            return {
                ...state, 
                addresses: action.payload
            };
        
        case "ADD_ADDRESS":
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            };

        case "REMOVE_ADDRESS":
            return {
                ...state,
                addresses: state.addresses.filter(address => address._id !== action.payload)
            };

        case "UPDATE_ADDRESS":
            
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    return address._id === action.payload._id ? 
                    action.payload :
                    address
                })
            };

        case "SET_SHIPPING_ADDRESS":
            
            return {
                ...state,
                shippingAddress: action.payload
            }
    
        default:
            return state;
    }
};