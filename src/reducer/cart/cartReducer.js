export const initialState = {
    cart: []
}

export function cartReducer(state, action) {
    
    switch (action.type) {
        case "LOAD_CART":
            return {
                ...state, cart: action.payload
            }

        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, {
                    ...action.payload,
                    quantity: 1
                }],
            }

        case "INCREMENT":
            return {
                ...state,
                cart: state.cart.map((item) => item.product._id === action.payload._id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : {
                    ...item
                })
            };


        case "DECREMENT":
            return {
                ...state,
                cart: state.cart.map((item) =>
                        item.product._id === action.payload._id ? {
                            ...item,
                            quantity: item.quantity - 1
                        } : {
                            ...item
                        })
                    .filter((item) => item.quantity !== 0)
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.product._id !== action.payload._id),
            };

        case "CLEAR_SESSION":
            return {
                ...state,
                cart: []
            }
    
    
        default:
            return state
    }
}

