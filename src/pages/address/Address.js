import "./address.css";
import axios from "axios";
import { API } from "../../config/constants";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import { useAddressContext } from "../../context/AddressContext";
import { AddressForm } from "../../components/Address/AddressForm";
import { useNavigate } from "react-router-dom";
import { useWishlistContext } from "../../context/WishlistContext";
import { useCartContext } from "../../context/CartContext";

export function Address() {

    const { addressState, addressDispatch } = useAddressContext();
    const { wishlistDispatch } = useWishlistContext();
    const { cartDispatch } = useCartContext();
    
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [displayAddressForm, setDisplayAddressForm] = useState(false);

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

    function editHandler(addressId) {
        console.log(addressId);
        navigate(`/editAddress/${addressId}`);
    };

    function toggleAddressForm() {
        setDisplayAddressForm(!displayAddressForm);
    };

    function shipHandler(address) {
        navigate("/orderConfirmed");
        addressDispatch({type: "SET_SHIPPING_ADDRESS", payload: address });
        cartDispatch({ type: "CLEAR_SESSION"});
        wishlistDispatch({ type: "CLEAR_SESSION" })
    }

    return (
        <div className="container text-center">
            <h1>Select Address</h1>
            <ul className="address-flex flex-wrap">
                {
                    addressState.addresses.map(address => (
                        <li 
                            key={address._id} 
                            className="border radius-5 width-full my-1 p1 flex-col cursor-pointer"
                        >
                            <address className="flex-grow-1 cursor-pointer">
                                <h3>{address.fullName}</h3>
                                <p>Door No. : {address.flatNo}, </p>
                                <p>{address.streetName},</p>
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                            </address>

                            <div>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => shipHandler(address)}
                                >
                                    Ship Here
                                </button>

                                <button 
                                    className="btn btn-primary my-1 ml-15"
                                    onClick={() => editHandler(address._id)}
                                >
                                    Edit
                                </button>

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
                className={`my-1 btn btn-primary`}
            >
                Set New Address
            </button>

            {
                displayAddressForm && 
                <AddressForm setDisplayAddressForm={setDisplayAddressFormFunction} /> 
            }
        </div>
    )
}
