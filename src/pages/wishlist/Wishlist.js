import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Loader } from "../../components/Loader";
import { updateCart, removeItemFromWishlist } from "../../utilityFunctions/networkCalls";
import { useWishlistContext } from "../../context/WishlistContext";
import { useCartContext } from "../../context/CartContext";

export const Wishlist = () => {
    const { wishlistState, wishlistDispatch } = useWishlistContext();
    const { cartState, cartDispatch } = useCartContext();
    const [isLoading] = useState(false);

    async function moveToCart(productId, item) {
        const removeItemStatus = await removeItemFromWishlist(productId);
        const addItemToCartStatus = await updateCart(productId);

        if (removeItemStatus === 200 && addItemToCartStatus === 200) {
            cartDispatch({
                type: "ADD_TO_CART",
                payload: item
            })

            wishlistDispatch({
                type: "REMOVE_FROM_WISHLIST",
                payload: {
                    product: item.product
                }
            })
        }
    }

    async function removeFromWishlist(productId, item) {
        const status = await removeItemFromWishlist(productId);

        if (status === 200) {
            wishlistDispatch({
                type: "REMOVE_FROM_WISHLIST",
                payload: {
                    product: item.product
                }
            })
        }
    }

    if (isLoading) {
        return <Loader/>   
    };

    console.log(wishlistState);

    return (
        <div className="container">
            <div className="flex-row my-1 items-center">
                <h1> Wishlist </h1>
                <h2 style={{fontWeight: "400"}} >
                    (
                        { wishlistState.wishlist.length }
                        { wishlistState.wishlist.length === 1 ? " item" : " items" }
                    )
                </h2>
            </div>
            <ul className="flex-row flex-wrap width-100 items-center">
                {wishlistState.wishlist.map(item => (
                    <li key={item.product._id} className="p025 product-card-width">
                        <Link to={`/product/${item.product._id}`}>
                            <img src={item.product.image} alt={item.product.name} className="width-100" />
                        </Link>   
                        <div className="flex-row items-center justify-between">
                            <Link className="" to={`/product/${item.product._id}`}>
                                <h3>{item.product.name}</h3>
                            </Link>
                            <FaHeart 
                                onClick={() => removeFromWishlist(item.product._id, item)}
                                cursor={"pointer"} size={20} 
                            /> 
                        </div>  
                        <Link to={`/product/${item.product._id}`}>
                            <p className="text-xs width-100">{item.product.brand}</p>
                            <h3 className="width-100">₹ {item.product.price.toLocaleString("en-IN")}</h3>
                        </Link>
                        {cartState.cart.reduce((acc, cur) => {
                            return cur.product._id === item.product._id ? 
                            <Link className="btn btn-primary width-100 btn-green" to="/cart">
                                Go To Cart
                            </Link>  : acc
                        }, <button
                           disabled={!item.product.inStock}
                            className="btn btn-primary width-100"
                            style={{
                                cursor: item.product.inStock ? 'pointer' : 'not-allowed',
                                background: item.product.inStock ? "" : "#d55"
                            }}
                            onClick={() => moveToCart(item.product._id, item)}
                        >
                            {item.product.inStock ? "Move To Cart" : "Out Of Stock"}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}