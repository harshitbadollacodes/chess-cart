import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "../../context/AuthContext";
import { Logout } from "./Logout";
import { API } from "../../config/constants";

export const Login = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        token,
        setToken,
        setUserId,
        setIsUserLoggedIn
    } = useAuthContext();

    const { state } = useLocation();
    
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        email: "", 
        password: ""
    });

    async function loginHandler(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if (userInput.email.length !== 0 && userInput.password.length !== 0) {
                const {
                    data: { userId, token }, status } = await axios.post(`${API}/user/login`, {
                    email: userInput.email,
                    password: userInput.password
                });

                const userComingFrom = state?.from ? state.from : "/login";
                setupAuthHeaderForServiceCalls(token);
                
                if (status === 200) {
                    setIsUserLoggedIn(true);
                    setLoading(false);
                    localStorage.setItem("userDetails", JSON.stringify({
                        userId,
                        token
                    }));
                    
                    setError(false);
                    setToken(token);
                    setUserId(userId);
                    
                    navigate(userComingFrom);

                }

            } else {
                setError("Please fill in the email & password");
                setLoading("false");
            } 

        } catch (error) {
            setLoading(false);
            if (error.request.status === 401) {
                setError(error.response.data.message);
            }
        }
    }
   
    return (
        <div className="container">
                <div className="login m1">
                <div className="flex-col">
                    <h1 className="login-form-heading mb-1">{token ? "Hello, You're logged in." : "Login"}</h1>
                    
                    { error && <h3 style={{color: "red"}}>{error}</h3> }
                    
                    { token ? 
                        <Logout/> 
                        : 
                        <form onSubmit={loginHandler}>
                            <div className="login-form-input flex-col mb-1" >
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    className="p025" 
                                    value={userInput.email}
                                    onChange={(e) => setUserInput({...userInput, email: e.target.value})} 
                                />
                            </div>
                            <div className="login-form-input flex-col mb-1">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    className="p025" 
                                    value={userInput.password}
                                    onChange={(e) => setUserInput({...userInput, password: e.target.value})} 
                                />
                                <p className="text-s m025">Don't have an account yet? 
                                    <Link to="/signup">Sign Up here</Link>
                                </p>
                            </div>
                            <button 
                                className="btn width-100 btn-primary my-1"
                                onClick={() => {
                                    setUserInput({ ...userInput, email: "testing@gmail.com", password: "testing" });
                                }}
                            >
                                Guest Login
                            </button>

                            <input 
                                type="submit" 
                                value={loading ? "Logging in..." : "Login"} 
                                className="btn width-100 btn-primary btn-width-100 p025"
                            /> 

                        </form>
                    }
                </div>
            </div>
        </div>
    );
}