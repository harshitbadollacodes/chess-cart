export const initialState = {
    wishlist: []
};

export const wishlistReducer = (state, action) => {
    
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return {
                ...state,
                wishlist: [...state.wishlist, {
                    ...action.payload
                }]
            }

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter((item) => item.product._id !== action.payload.product._id)
            };

        case "LOAD_WISHLIST": 
            return {
                ...state,
                wishlist: action.payload
            }

        case "CLEAR_SESSION":
            return {
                ...state,
                wishlist: []
            }
    
        default:
            return state;
    }
};

