import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export const CartSummary = () => {
    
    const { cartState } = useCartContext();
    const totalCartValue = cartState.cart.reduce((acc, cur) => acc + (cur.quantity * cur.product.price), 0);

    return (
        <div className="cart-bill" style={{ height: "fit-content" }}>
            <div className="p1">
                <h3>PRICE DETAILS ({cartState.cart.length} {cartState.cart.length > 1 ? "items" : "item"})</h3>
                
                {cartState.cart.map((item) => {
                    return (
                        <div className="flex-row justify-between" key={item.product._id}>
                            <h3>{item.quantity} 
                                <span style={{fontWeight: "400"}}> 
                                    * {item.product.name} @ ₹ {item.product.price}
                                </span>
                            </h3>
                            <h3>₹ {item.quantity * item.product.price}</h3>
                        </div>
                    )
                })}

                <hr className="m1"></hr>

                <div className="flex-row justify-between">
                    <h3>Grand Total</h3>
                    <h3>₹ {totalCartValue}</h3>
                    <Link to="/address" className="btn btn-primary">Checkout</Link>
                </div>

            </div>
        </div>     
    )
}