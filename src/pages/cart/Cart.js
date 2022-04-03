import "./cart.css";
import { useState } from "react";
import { CartSummary } from "../../components/cartComponents/CartSummary";
import { Loader } from "../../components/Loader";
import { EmptyCart } from "../../components/cartComponents/EmptyCart"; 
import { updateQuantity, removeItemFromCart, updateWishlist } from "../../utilityFunctions/networkCalls";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { Spinner } from "../../components/Spinner";

export const Cart = () => {

    const { isLoading, cartState, cartDispatch } = useCartContext();
    const { wishlistDispatch } = useWishlistContext();

    const [removeId, setRemoveId] = useState(null);
    const [wishlistId, setWishlistId] = useState(null);
    const [decQuantityId, setDecQuantityId] = useState(null);
    const [incQuantityId, setIncQuantityId] = useState(null);

    async function removeFromCart(productId, item) {
        setRemoveId(productId);
        const status = await removeItemFromCart(productId);
        
        if (status === 200) {
            setRemoveId(null);
            cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: item.product
            });
        };
    };

    async function decrementQuantity(productId, item) {
        setDecQuantityId(productId);
        const quantity = item.quantity - 1;
        const status = await updateQuantity(productId, quantity);

        if (status === 200) {
            setDecQuantityId(null);
            cartDispatch({
                type: "DECREMENT",
                payload: item.product
            });
        };
    };


    async function incrementQuantity(productId, item) {
        setIncQuantityId(productId);
        const quantity = item.quantity + 1;
        const status = await updateQuantity(productId, quantity);

        if (status === 200) {
            setIncQuantityId(null);
            cartDispatch({
                type: "INCREMENT",
                payload: item.product
            });
        };
    };

    async function moveToWishlist(productId, item) {        

        setWishlistId(productId);

        console.log(productId)
        console.log(productId === wishlistId)

        const moveToWishlistStatus = await updateWishlist(productId);
        const removeItemStatus = await removeItemFromCart(productId);

        if (moveToWishlistStatus === 200 && removeItemStatus === 200) {
            setWishlistId(null);
            wishlistDispatch({
                type: "ADD_TO_WISHLIST",
                payload: item
            });

            cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: item.product
            });
        };
    };


    if (isLoading) {
        return <Loader/>
    };

    return (
        <div className="container">
                <h1 className="m1">Cart</h1>
            <div className="cart-flex">
                <ul>
                    {cartState.cart.map((item) => (
                        <li key={item.product._id} className="flex-row mb-1 p-1 border radius-5">
                            <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="width-40 mx-1 img-height"
                            />
                            <div className="flex-col justify-space-evenly mx-1">
                                <div className="product-details">
                                    <h3>{item.product.name}</h3>
                                    <p>{item.product.brand}</p>
                                    <h3>₹ {item.product.price}</h3>
                                </div>
                                <div className="flex-row my-1">
                                    <button 
                                        className="btn decrement-btn cursor-pointer" 
                                        onClick={() => {
                                            decrementQuantity(item.product._id, item);
                                        }}
                                    >   
                                        {decQuantityId ? <Spinner/> : "-"}
                                    </button>

                                    <p className="text-m ml-15">{item.quantity}</p>

                                    <button 
                                        className="btn increment-btn cursor-pointer ml-15"
                                        onClick={() => {
                                            incrementQuantity(item.product._id, item);
                                        }}
                                    >
                                        {incQuantityId ? <Spinner/> : "+"}

                                    </button>
                                </div>

                                <div>
                                    <button 
                                        className="btn width-100 btn-primary btn-red text-uppercase" 
                                        onClick={() => {
                                            removeFromCart(item.product._id, item)
                                        }}
                                    >
                                        { removeId === item.product._id && <Spinner/> } Remove
                                    </button>
                                    <button  
                                        className="btn width-100 btn-primary text-uppercase my-1" 
                                        onClick={() => {
                                            moveToWishlist(item.product._id, item)
                                        }}
                                    >
                                        {wishlistId === item.product._id && <Spinner/>}
                                        Move to Wishlist
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                { cartState.cart.length > 0 ?  <CartSummary/> : <EmptyCart/> }

            </div>
        </div>
    );
}