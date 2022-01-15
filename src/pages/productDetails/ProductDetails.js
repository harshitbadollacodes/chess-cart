import "./productDetails.css";
import axios from "axios";
import { API } from "../../config/constants";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeartBroken, FaCartArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { updateCart, updateWishlist, removeItemFromWishlist } from "../../utilityFunctions/networkCalls";
import { useAuthContext } from "../../context/AuthContext";

export const ProductDetails = () => {

    let { productId } = useParams();   
    const [product, setProduct] = useState(null);

    const { token } = useAuthContext();
    const { cartState, cartDispatch } = useCartContext();
    const { wishlistState, wishlistDispatch } = useWishlistContext();

    let navigate = useNavigate();

    const isProductInWishlist = (productId) => {
        return wishlistState.wishlist.find(item => item.product._id === productId);
    };

    const isProductInCart = (productId) => {
        return cartState.cart.find(item => item.product._id === productId);
    }

    async function addToWishlist(productId, item) {
        if (token) {
            const status = await updateWishlist(productId);
            
            if (status === 200) {
                wishlistDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: {
                        product: item
                    }
                })
            }
        } else {
            navigate("/login");
        }
    }

    async function removeFromWishlist(productId, item) {
        if (token) {

            const status = await removeItemFromWishlist(productId);

            if (status === 200) {
                wishlistDispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: {
                        product: item
                    }
                })
            }
        } else {
            navigate("/login");
        }
    };

    async function addToCart(productId, item) {
        if (token) {
            const updateCartStatus = await updateCart(productId, item);
            
            if (updateCartStatus === 200) {
                cartDispatch({
                    type: "ADD_TO_CART",
                    payload: {
                        product: item
                    }
                });

            }
            
        } else {
            navigate("/login");
        }
    }
    
    useState(() => {
        (async function () {
            try {
                const {data: { product }, status} = await axios.get(`${API}/products/${productId}`);

                if(status === 200) {
                    return setProduct(product);
                };

            } catch (error) {
                console.error({error});
                if (error.response.status === 400) {
                    navigate("/products");
                }
            }
        })();
    }, [product]);

    

    return (
        <div className="container">
            {
                product === null ? <h1> Loading... </h1> 
                : 
                <div className="my-1 width-100 flex-display">
                    <img src={product.image} alt={product.name} />
                    <div className="flex-col mx-1 justify-space-evenly">
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.brand}</p>
                        </div>
                        <h3>Rs. {product.price}</h3>
                        <div>
                        {isProductInWishlist(product._id) ?  
                            <button
                                onClick={() => { 
                                    removeFromWishlist(product._id, product);
                                }}
                                className="btn btn-primary width-100 my-1"
                            >
                                Remove From Wishlist <FaHeartBroken/>
                            </button>
                            :
                            <button
                                onClick={() => {
                                    addToWishlist(product._id, product);
                                }}
                                className="btn btn-primary width-100 my-1"
                            >
                                Add to Wishlist <FaRegHeart/>
                            </button>
                        }

                            {isProductInCart(product._id) ? 
                                <Link className="btn btn-primary width-100 btn-green" to="/cart">
                                    Go To Cart <FaCartArrowDown/>
                                </Link>
                                :
                                <button 
                                    disabled={!product.inStock} 
                                    className="btn btn-primary width-100"
                                    style={{
                                        cursor: product.inStock ? 'pointer' : 'not-allowed', 
                                        background: product.inStock ? "" : "#d55"
                                    }}  
                                    onClick={() => addToCart(product._id, product)}
                                >
                                    {product.inStock ? "Add to Cart" : "Out Of Stock"}
                                </button>
                            }
                        </div>
                    </div>
                </div>     
            }
        </div>
    )
}