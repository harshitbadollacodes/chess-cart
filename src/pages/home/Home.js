import "./home.css";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="banner">
            <div className="bg-overlay">
                <div className="flex-col flex-all-center height-100">
                    <Link to="/products" className="btn btn-primary my-1 w-20">Products</Link>
                    <Link to="/login" className="btn btn-primary my-1 w-20">Login</Link>
                </div>
            </div>
        </div>
    )
}