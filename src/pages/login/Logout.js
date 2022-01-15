import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductsContext";
import { useWishlistContext } from "../../context/WishlistContext";

export const Logout = () => {

    const { setUserId, setToken } = useAuthContext();
    const { dispatch } = useProductContext();

    const { cartDispatch } = useCartContext();
    const { wishlistDispatch } = useWishlistContext();

    function logoutHandler() {
        localStorage.removeItem("userDetails");
        setUserId(null);
        setToken(null);
        
        dispatch({
            type: "CLEAR_SESSION"
        });

        cartDispatch({
            type: "CLEAR_SESSION"
        });
        
        wishlistDispatch({
            type: "CLEAR_SESSION"
        });
    }

    return ( 
        <div>
            <button className="btn btn-primary" onClick={logoutHandler}>
                want to Logout ?
            </button>
        </div>
     );
}