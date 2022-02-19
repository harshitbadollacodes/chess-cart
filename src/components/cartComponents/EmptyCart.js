// import "../../pages/cart/cart.css";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <div className="flex-col my-1 flex-all-center">
                <h1>Hey, it feels so light!</h1>
                <p>There is nothing in your bag. Let's add some items.</p>
            </div>
            <div className="flex-row my-1 flex-all-center">
                <Link to="/products">
                    <h3 className="btn btn-primary text-uppercase">Go Shopping</h3>
                </Link> 
                
                <Link to="/wishlist">
                    <h3 className="btn btn-primary text-uppercase ml-15">Add from Wishlist</h3>
                </Link>
            </div>
        </div>
    );
}