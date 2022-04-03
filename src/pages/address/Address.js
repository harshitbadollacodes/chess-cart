import "./address.css";
import axios from "axios";
import { API } from "../../config/constants";
import { useEffect, useState } from "react";
import { useAddressContext } from "../../context/AddressContext";
import { AddressForm } from "../../components/Address/AddressForm";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { Spinner } from "../../components/Spinner";

export function Address() {

    const { cartState, cartDispatch } = useCartContext();
    console.log(cartState);
    const totalCartValue = cartState.cart.reduce((acc, cur) => acc + (cur.quantity * cur.product.price), 0);
    
    const { addressState, addressDispatch } = useAddressContext();

    const [spinner, setSpinner] = useState(false);
    const [displayAddressForm, setDisplayAddressForm] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);

    const navigate = useNavigate();

    function setDisplayAddressFormFunction(booleanValue) {
        setDisplayAddressForm(booleanValue);
    }

    async function removeAddress(addressId) {
        try {
            const {status} = await axios.delete(`${API}/address/${addressId}`);

            if (status === 200) {
                addressDispatch({ type: "REMOVE_ADDRESS", payload: addressId })
            }
            
        } catch(error) {
            console.log({error});
        }
    }

    function toggleAddressForm() {
        setDisplayAddressForm(!displayAddressForm);
    };

    function shipHandler(address) {
        addressDispatch({type: "SET_SHIPPING_ADDRESS", payload: address });
        setShippingAddress(address);
    };

    async function paymentHandler() {
        setSpinner(true);
        try {
            const {data: {order}} = await axios.post(`${API}/razorpay/pay`, {
                amount: totalCartValue
            });

            const options = {
                "key_id": "rzp_test_2UTXpsJNLITMDO", 
                "key_secret": "7ffWU2RPFCi5tfnieHK9WWMk",
                "amount": order.amount,
                "currency": "INR",
                "name": "Chesscart",
                "order_id": order.id,
                "handler": async (response) => {
                    if(response.razorpay_payment_id) {
                        setSpinner(false);
                        cartDispatch({ type: "CLEAR_SESSION" });

                        const { status } = await axios.delete(`${API}/cart/clearCart`, {});
                        
                        if (status === 200) {
                            navigate("/orderConfirmed");    
                        };
                        
                    }
                },
                prefill: {
                    "name": shippingAddress.fullName,
                    "contact": "+919988776655",
                    "email": "example@example.com",
                },
                method: {
                    netbanking: true,
                    card: false,
                    wallet: false,
                    upi: false,
                },
                config: {
                    display: {
                        hide: [{ method: "paylater" }],
                        preferences: { show_default_blocks: true },
                    },
                },
            };
            
            let razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch(error){
            console.log({error});
            setSpinner(false);
        } finally {
            setSpinner(false);
        }
    };
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="container">
            <h1>Select Address</h1>
            <ul className="address-flex flex-wrap">
                {
                    addressState.addresses.map(address => (
                        <li 
                            key={address._id} 
                            className={`
                                ${shippingAddress?._id === address._id 
                                && "bg-powderblue"} 
                                border radius-5 width-full my-1 p1 flex-col cursor-pointer
                            `}
                        >
                            <address className="flex-grow-1 cursor-pointer">
                                <h3>{address.fullName}</h3>
                                <p>Door No. : {address.flatNo}, </p>
                                <p>{address.streetName},</p>
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                            </address>

                            <div>
                                <button 
                                    className={`
                                        ${shippingAddress?._id === address._id 
                                        && "bg-green"} 
                                        btn btn-primary
                                    `}
                                    onClick={() => shipHandler(address)}
                                >
                                    Ship Here
                                </button>

                                <Link 
                                    to={`/editAddress/${address._id}`}
                                    className="btn btn-primary my-1 ml-15"
                                >
                                    Edit
                                </Link>

                                <button 
                                    className="btn btn-primary btn-red ml-15"
                                    onClick={() => removeAddress(address._id)}
                                >
                                    Remove
                                </button>
                            </div>

                        </li>
                    ))
                }
            </ul>
        
            <button 
                onClick={() => toggleAddressForm()}
                className="my-1 btn btn-primary"
            >
                Set New Address
            </button>
            
            { 
                shippingAddress && 
                <button 
                    className={`btn ml-10 btn-primary bg-green ${spinner ? "cursor-disabled" : "cursor-pointer"}`}
                    disabled={spinner}
                    onClick={paymentHandler}
                >
                    {spinner && <Spinner/>} Proceed To Payment
                </button>
            }

            {
                displayAddressForm && 
                <AddressForm setDisplayAddressForm={setDisplayAddressFormFunction} /> 
            }
        </div>
    )
}
