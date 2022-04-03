import axios from "axios";
import { createContext, useReducer, useEffect, useContext, useState } from "react";
import { API } from "../config/constants";
import { cartReducer, initialState } from "../reducer/cart/cartReducer";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                if (token) {
                    
                    setupAuthHeaderForServiceCalls(token);
                    
                    const {data: {cart: { cartItems } }, status} = await axios.get(`${API}/cart/`);
                    
                    if (status === 200) {
                        setIsLoading(false);
                        cartDispatch({
                            type: "LOAD_CART",
                            payload: cartItems
                        })
                    }
                };
                
            } catch(error) {
                console.log({error});
                setIsLoading(false)
            }
        })()
        
    }, [token]);

    

    return (
        <CartContext.Provider value={{isLoading, setIsLoading, cartState, cartDispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};