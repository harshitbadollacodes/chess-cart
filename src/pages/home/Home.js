import "./home.css";
import chessKnight from "../../images/chessKnight.png"
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <header className="banner">
                <div className="bg-overlay">
                    <div className="flex-col flex-all-center height-100">
                        <h1 className="l-heading text-white">
                            Welcome to Chess Cart 
                            <span>
                                <img src={chessKnight} className="header-logo" alt="banner"/>
                            </span> 
                        </h1>
                        <p className="tagline text-white">A one stop shop for Chess lovers.</p>
                        <div className="flex flex-row">
                            <Link to="/products" className="btn bg-white my-1 w-20">Explore</Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}