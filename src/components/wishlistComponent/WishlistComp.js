// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useAuthContext } from "../../context/AuthContext";
// import { Loader } from "../Loader";
// import { updateCart, removeItemFromWishlist } from "../../utilityFunctions/networkCalls";
// import { useWishlistContext } from "../../context/WishlistContext";
// import { useCartContext } from "../../context/CartContext";

// export const WishlistComp = () => {
//     const { wishlistState, wishlistDispatch } = useWishlistContext();
//     const { cartState, cartDispatch } = useCartContext();
//     const { token } = useAuthContext();
//     const [isLoading] = useState(false);

//     async function moveToCart(productId, token, item) {
//         const removeItemStatus = await removeItemFromWishlist(productId, token);
//         const addItemToCartStatus = await updateCart(productId, token);

//         if (removeItemStatus === 200 && addItemToCartStatus === 200) {
//             cartDispatch({
//                 type: "ADD_TO_CART",
//                 payload: item
//             })

//             wishlistDispatch({
//                 type: "REMOVE_FROM_WISHLIST",
//                 payload: {
//                     product: item.product
//                 }
//             })
//         }
//     }

//     async function removeFromWishlist(productId, token, item) {
//         const status = await removeItemFromWishlist(productId, token);

//         if (status === 200) {
//             wishlistDispatch({
//                 type: "REMOVE_FROM_WISHLIST",
//                 payload: {
//                     product: item.product
//                 }
//             })
//         }
//     }

//     if (isLoading) {
//         return <Loader/>   
//     }

//     return (
//         <div className="container">
//             <div className="flex-row gap m1">
//                 <h1> Wishlist </h1>
//                 <h2 style={{fontWeight: "400"}} >
//                     (
//                         { wishlistState.wishlist.length }
//                         { wishlistState.wishlist.length > 1 ? " items" : " item" }
//                     )
//                 </h2>
//             </div>
//             <ul className="store-ul">
//                 {wishlistState.wishlist.map((item) => (
//                     <li key={item.product._id}>
//                         <div className="card p025">
//                             <img src={item.product.image} className="img product-img"  alt={item.product.name}/>
//                             <div className="card-content p025">
//                                 <div className="product-description flex-row justify-between">
//                                     <h3 className="product-brand">{(item.product.brand)}</h3>
//                                     <div>
//                                         <FaHeart 
//                                         onClick={() => removeFromWishlist(item.product._id, token, item)}
//                                         cursor={"pointer"} size={20} /> 
//                                     </div>
//                                 </div>

//                                 <h3 className="product-name">{item.product.name}</h3>

//                                 <div className="price-container flex-row">
//                                     <h3>₹{Number(item.product.price).toFixed(0)}</h3>
//                                     <p className="strikethrough"> ₹{Number(item.product.price * 2).toFixed(0)}</p>
//                                     <p>(50% off)</p>
//                                 </div>

//                                 {cartState.cart.reduce((acc, cur) => {
//                                     return cur.product._id === item.product._id ? 
//                                     <Link className="btn btn-primary width-100 btn-green" to="/cart">
//                                         Go To Cart
//                                     </Link>  : acc
//                                 }, <button
//                                 disabled={!item.product.inStock}
//                                 className="btn btn-primary btn-width-100"
//                                 style={{
//                                     cursor: item.product.inStock ? 'pointer' : 'not-allowed',
//                                     background: item.product.inStock ? "" : "#d55"
//                                 }}
//                                 onClick={() => moveToCart(item.product._id, token, item)}
//                                 >
//                                 {item.product.inStock ? "Move To Cart" : "Out Of Stock"}
//                             </button>)}

//                             </div>
//                         </div>  
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }