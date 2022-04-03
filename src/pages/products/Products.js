import "./Product.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductsContext";
import { SortFilterButtons } from "../../components/productComponents/Mobile/SortFilterButtons";
import { DesktopSortFilterOptions } from "../../components/productComponents/desktop/DesktopSortFilterOptions";
import { Loader } from "../../components/Loader";
import { useAuthContext } from "../../context/AuthContext";
import { updateCart } from "../../utilityFunctions/networkCalls";
import { updateWishlist, removeItemFromWishlist } from "../../utilityFunctions/networkCalls";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { useState } from "react";
import { Spinner } from "../../components/Spinner";

export const Products = () => {
    
    const [productId, setProductId] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const { state, data, isLoading } = useProductContext();
    const { cartState, cartDispatch } = useCartContext();
    const { wishlistState, wishlistDispatch } = useWishlistContext();
    const { token } = useAuthContext();

    const [wishlistId, setWishlistId] = useState(null);
    
    const navigate = useNavigate();

    const isProductInWishlist = (productId) => {
        return wishlistState.wishlist.find(item => item.product._id === productId);
    };

    const isProductInCart = (productId) => {
        return cartState.cart.find(item => item.product._id === productId);
    };
    
    async function addToCart(productId, item) {
        setSpinner(true);
        setProductId(productId);
        if (token) {
            const updateCartStatus = await updateCart(productId, item);
            
            if (updateCartStatus === 200) {
                setSpinner(false);
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

    async function addToWishlist(productId, item) {
        setWishlistId(productId);
        if (token) {
            const status = await updateWishlist(productId);
            
            if (status === 200) {
                setWishlistId(null);
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
        setWishlistId(productId);
        if (token) {

            const status = await removeItemFromWishlist(productId);

            if (status === 200) {
                setWishlistId(null);
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
    }

    const sortItems = (items, sortType) => {
        if(sortType === "LOW_TO_HIGH") {
            return items.sort((a, b) => a.price - b.price);
        } 
        
        if(sortType === "HIGH_TO_LOW") {
            return items.sort((a, b) => b.price - a.price);
        }

        if(sortType === null) {
            return items;
        }
    };

    const getSortedData = sortItems(data, state.sortBy);
    
    const filterItems = (items, filter, fastDelivery) => {
        return items
            .filter(item => filter ? item.inStock : item)
            .filter(item => fastDelivery ? item.fastDelivery : item);
    };

    const getFilteredProducts = filterItems(getSortedData, state.filter, state.fastDelivery);

    if (isLoading) {
        return <Loader/>
    }
    
    return (
        <div className="container container-width-1400 mt-2">            
            <div className="flex-row">
                <DesktopSortFilterOptions/>
                <ul className="flex-row flex-wrap width-100 items-center">
                    {getFilteredProducts.map(product => (
                        <li key={product._id} className="p025 product-card-width">
                            <Link to={`/product/${product._id}`}>
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="width-100 img-height" 
                                />
                            </Link>
                            <div className="flex-row items-center justify-between">
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-ellipsis">{product.name}</h3>
                                </Link>

                                {
                                    wishlistId === product._id 
                                    ? <Spinner/> 
                                    : isProductInWishlist(product._id) ?
                                    <FaHeart 
                                        onClick={() => { 
                                            removeFromWishlist(product._id, product);
                                        }}
                                        cursor={"pointer"} size={20}
                                    /> 
                                    :
                                    <FaRegHeart 
                                        onClick={() => {
                                            addToWishlist(product._id, product);
                                        }}
                                        cursor={"pointer"} size={20}
                                    />
                                }
                            </div>
                            <Link to={`/product/${product._id}`}>
                                <p className="text-xs">{product.brand}</p>
                                <p>{product.fastDelivery ? "Fast Delivery" : "No Fast Delivery"}</p>
                                <h3>₹ {product.price.toLocaleString("en-IN")}</h3>
                            </Link>
                                {isProductInCart(product._id) ? 
                                    (
                                        <Link className="btn btn-primary width-100 btn-green" to="/cart">
                                            Go To Cart
                                        </Link>
                                    )
                                    :
                                    (
                                        <button 
                                            disabled={!product.inStock} 
                                            className="btn btn-primary width-100"
                                            style={{
                                                cursor: product.inStock ? 'pointer' : 'not-allowed',
                                                background: product.inStock ? "" : "#d55",
                                            }}   
                                            onClick={() => {
                                                addToCart(product._id, product);
                                            }}>
                                                {productId === product._id && <Spinner/>}
                                                
                                                {
                                                    product.inStock 
                                                    ? productId === product._id 
                                                    ? "Adding To Cart..." : "Add To Cart"
                                                    : "Out of Stock"
                                                }

                                        </button>
                                    )
                                }
                        </li>
                    ))}
                </ul>
            </div> 
            <SortFilterButtons />            
        </div>
    );
}