import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaRegHeart, FaUserAlt } from "react-icons/fa";
import chessKnight from "../../images/chessKnight.png"
import { useCartContext } from "../../context/CartContext";

export const Navbar = () => {
    const { cartState } = useCartContext();

    return (
        <div className=" bg-nav-dark">
            <nav className="container container-width-1400 nav-flex nav-space-between">
                                
                <Link to="/">
                    <div className="flex-row items-center">
                        <img className="nav-logo" src={chessKnight} alt="logo" />
                        <h2 className="text-white">Chess Cart</h2>
                    </div>
                </Link>
                
                <ul className="nav-link items-center">
                    <li>
                        <Link to="wishlist">
                            <FaRegHeart size={28} color={"#fff"}/>
                        </Link>
                    </li>

                    <li className="ml-15">
                        <Link to="cart">
                            <div className="badge-icon">
                                <FaShoppingBag size={28} color={"#fff"}/>
                                <p>{cartState.cart.length}</p>
                            </div>
                        </Link>
                    </li>

                    <li className="ml-15">
                        <Link to="login">
                            <div className="badge-icon">
                                <FaUserAlt size={28} color={"#fff"}/>
                            </div>
                        </Link>
                    </li>

                </ul>

            </nav>
        </div>
    );
}