import "./pageNotFound.css";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <div className="container flex-col items-center">
            <h1 className="text-large text-300">404</h1>
            <h3 className="text-l text-300 my-1 text-center">Page Not Found</h3>
            <p className="text-center">We're sorry the page you requested could not be found.Please go back to the homepage</p>
            <Link 
                to="/"
                className="btn btn-primary my-1 cursor-pointer"
            >
                Home
            </Link>
        </div>
    );
}
 
