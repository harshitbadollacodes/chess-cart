import { useState } from "react";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {

    const [error, setError] = useState(null);

    const {
        token,
        setToken,
        setUserId,
        setIsUserLoggedIn
    } = useAuthContext();

    const [userInput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        email: "", 
    });

    const [userPassword, setUserPassword] = useState({
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    async function signupHandler(e) {
        try {
            e.preventDefault();

            if (
                userInput.firstName && 
                userInput.lastName && 
                userInput.email && 
                userPassword.password && 
                (userPassword.password === userPassword.confirmPassword)) {
        
                    const { data: { userId, token }, status } = await axios.post("https://chessCart.harshitbadolla.repl.co/user/signup", {
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email,
                        password: userPassword.password,
                        confirmPassword: userPassword.confirmPassword
                    });

                    userInput.firstName = "";
                    userInput.lastName = "";
                    userInput.email = "";
                    userInput.password = "";
                    userInput.confirmPassword = "";

                    if (status === 200) {
                        setIsUserLoggedIn(true);
                        localStorage.setItem("userDetails", JSON.stringify({
                            userId,
                            token
                        }));
                        setError(false);
                        setToken(token);
                        setupAuthHeaderForServiceCalls(token);
                        setUserId(userId);

                        navigate("/login");
                    };
                } else {
                    setError("Passwords do not match");
                } 
            } catch(error) {
                console.log(error);
                if (error.request.status === 409) {
                    setError(error.response.data.message);
                }
            }    
        }

    if (token) {
        navigate("/");
    }

    return (
        <div>
            <div className="signup m1">
                <div className="flex-col width-70">
                    <h1 className="mb-1">Signup</h1>
                    {error && <h3 style={{color: "red"}}>{error}</h3>}
                    <form onSubmit={signupHandler}>
                        <div className=" flex-col mb-1">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                value={userInput.firstName} 
                                required 
                                className="p025" 
                                onChange={
                                    (e) => setUserInput({...userInput, firstName: e.target.value})
                                }
                            />
                        </div>
                        <div className="signup-form-input flex-col mb-1">
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                value={userInput.lastName} 
                                required 
                                className="p025" 
                                onChange={
                                    (e) => setUserInput({...userInput, lastName: e.target.value})
                                } 
                            />
                        </div>

                        <div className="signup-form-input flex-col mb-1" >
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={userInput.email} 
                                required 
                                className="p025" 
                                onChange={
                                    (e) => setUserInput({...userInput, email: e.target.value})
                                }
                             />
                        </div>
                        <div className="signup-form-input flex-col mb-1">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={userInput.password} 
                                required 
                                className="p025" 
                                onChange={(e) => setUserPassword({...userPassword, password: e.target.value})
                            }
                        />
                        </div>
                        <div className="signup-form-input flex-col mb-1">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                value={userInput.confirmPassword} 
                                required 
                                className="p025" 
                                onChange={
                                    (e) => setUserPassword({...userPassword, confirmPassword: e.target.value})
                                } 
                            />
                            <p className="text-s">Have an account? <span><Link to="/login">Login</Link></span></p>
                        </div>
                        <input 
                            type="submit" 
                            value="Signup" 
                            className="btn width-100 btn-primary p025"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}