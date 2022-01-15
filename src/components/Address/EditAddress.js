import axios from "axios";
import { API } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext";
import { useState } from "react";


export function EditAddress() {

    const { addressId } = useParams();
    
    const { addressState, addressDispatch } = useAddressContext();
    const navigate = useNavigate();

    const address = addressState.addresses.find(address => address._id === addressId);

    const [fullName, setFullName] = useState(address.fullName);
    const [flatNo, setFlatNo] = useState(address.flatNo);
    const [streetName, setStreetName] = useState(address.streetName);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [pincode, setPincode] = useState(address.pincode);

    console.log(fullName, flatNo, streetName, city, state, pincode);

    async function editFormHandler(e) {
        e.preventDefault();
        try {

            const { status, data: { updatedAddress } } = await axios.post(`${API}/address/edit/${addressId}`, {
                fullName,
                flatNo,
                streetName,
                city,
                state,
                pincode
            });

            console.log(updatedAddress._id);

            if (status === 200) {
                addressDispatch({ type: "UPDATE_ADDRESS", payload: updatedAddress });
                navigate("/address");

            }


        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1>Edit Address</h1>

            <form 
                className="flex w-50 my-1point5"
                onSubmit={(e) => editFormHandler(e)} 
            >
                <div className="flex-col mb-1">
                    <label> Full Name: </label>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName}
                        className="p025" 
                        required
                        onChange={(e) => setFullName(e.target.value)}/>
                </div>

                <div className="flex-col mb-1">
                    <label> Flat No.  </label>
                    <input 
                        type="text" 
                        placeholder="Flat No." 
                        value={flatNo}
                        className="p025" 
                        required
                        onChange={(e) => setFlatNo(e.target.value)}/>
                </div>

                <div className="flex-col mb-1">
                    <label>Street Name </label>
                    <input 
                        type="text" 
                        placeholder="Street Name"
                        className="p025"
                        value={streetName}
                        required
                        onChange={(e) => setStreetName(e.target.value)}
                    />
                </div>

                <div className="flex-col mb-1">
                    <label>City </label>
                    <input 
                        type="text" 
                        placeholder="City" 
                        className="p025"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mb-1">
                    <label>State </label>
                    <input 
                        type="text" 
                        placeholder="State" 
                        className="p025"
                        value={state}
                        required
                        onChange={(e) => setState(e.target.value)}/>
                </div>

                <div className="flex flex-col mb-1">
                    <label>Pincode </label>
                    <input 
                        type="number" 
                        placeholder="pincode" 
                        className="p025" 
                        value={pincode}
                        required
                        onChange={(e) => setPincode(e.target.value)}/>
                </div>
                    <div>
                        <input
                            type="submit" 
                            value="Update Address" 
                            className="btn btn-primary my-1" 
                            
                        />
                        <button 
                            className="btn btn-primary btn-red ml-15"
                            onClick={() => navigate("/address")}
                        >
                            Cancel
                        </button>
                    </div>
            </form>

        </div>
    )
}
