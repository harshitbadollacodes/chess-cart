import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { API } from "../config/constants";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "./AuthContext";
import { wishlistReducer } from "../reducer/wishlist/wishlistReducer";
import { initialState } from "../reducer/wishlist/wishlistReducer";

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {

    const { token, userId } = useAuthContext();

    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    setupAuthHeaderForServiceCalls(token);
                    const response = await axios.get(`${API}/wishlist`);

                    if (response.status === 200) {
                        wishlistDispatch({
                            type: "LOAD_WISHLIST",
                            payload: response.data.wishlist.wishlistItems
                        })
                    }
                }
            } catch (error) {
                console.log({error});
            }
        })()
    }, [token, userId]);

    const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, initialState);

    return (
        <WishlistContext.Provider value={{wishlistState, wishlistDispatch}}>
            {children}
        </WishlistContext.Provider>
    )
};

export const useWishlistContext = () => {
    return useContext(WishlistContext);
}