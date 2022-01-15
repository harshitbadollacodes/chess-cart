import axios from "axios";
import { createContext, useReducer, useEffect, useContext } from "react";
import { API } from "../config/constants";
import { cartReducer, initialState } from "../reducer/cart/cartReducer";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { token, userId } = useAuthContext();

    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    setupAuthHeaderForServiceCalls(token);
                    
                    const {data: {cart: { cartItems } }, status} = await axios.get(`${API}/cart/`);
                    
                    if (status === 200) {
                        cartDispatch({
                            type: "LOAD_CART",
                            payload: cartItems
                        })
                    }
                }
                
            } catch(error) {
                console.log({error});
            }
        })()
        
    }, [token, userId]);

    

    return (
        <CartContext.Provider value={{cartState, cartDispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};