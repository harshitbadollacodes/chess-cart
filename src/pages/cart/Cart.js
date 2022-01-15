import "./cart.css";
import { useState } from "react";
import { CartSummary } from "../../components/cartComponents/CartSummary";
import { Loader } from "../../components/Loader";
import { EmptyCart } from "../../components/cartComponents/EmptyCart"; 
import { updateQuantity, removeItemFromCart, updateWishlist } from "../../utilityFunctions/networkCalls";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

export const Cart = () => {

    const { cartState, cartDispatch } = useCartContext();
    const { wishlistDispatch } = useWishlistContext();

    const [isLoading] = useState(false);

    async function removeFromCart(productId, item) {
        const status = await removeItemFromCart(productId);
        
        if (status === 200) {
            cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: item.product
            });
        };
    };

    async function decrementQuantity(productId, item) {
        const quantity = item.quantity - 1;
        const status = await updateQuantity(productId, quantity);

        if (status === 200) {
            cartDispatch({
                type: "DECREMENT",
                payload: item.product
            });
        };
    };


    async function incrementQuantity(productId, item) {
        const quantity = item.quantity + 1;
        const status = await updateQuantity(productId, quantity);

        if (status === 200) {
            cartDispatch({
                type: "INCREMENT",
                payload: item.product
            });
        };
    };

    async function moveToWishlist(productId, item) {        
        const moveToWishlistStatus = await updateWishlist(productId);
        const removeItemStatus = await removeItemFromCart(productId);

        if (moveToWishlistStatus === 200 && removeItemStatus === 200) {
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
                            <img src={item.product.image} alt={item.product.name} className="width-40"/>
                            <div className="flex-col justify-space-evenly" >
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
                                        -
                                    </button>

                                    <p className="text-m ml-15">{item.quantity}</p>

                                    <button 
                                        className="btn increment-btn cursor-pointer ml-15"
                                        onClick={() => {
                                            incrementQuantity(item.product._id, item);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-flex">
                                    <button 
                                        className="btn btn-primary btn-red text-uppercase" 
                                        onClick={() => {
                                            removeFromCart(item.product._id, item)
                                        }}
                                    >
                                        Remove
                                    </button>
                                    <button  
                                        className="btn btn-primary text-uppercase cart-btn-margin" 
                                        onClick={() => {
                                            moveToWishlist(item.product._id, item)
                                        }}
                                    >
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