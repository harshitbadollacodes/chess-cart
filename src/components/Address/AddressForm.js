import axios from "axios";
import { useState } from "react";
import { API } from "../../config/constants";
import { useAddressContext } from "../../context/AddressContext";



export function AddressForm({setDisplayAddressForm}) {

    const [fullName, setFullName] = useState("");
    const [flatNo, setFlatNo] = useState("");
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const { addressDispatch } = useAddressContext();
    

    async function addressFormHandler(e) {   
        e.preventDefault();
        try {
            const { data: { saveAddress }, status }  = await axios.post(`${API}/address/new`, {
                fullName,
                flatNo,
                streetName,
                city,
                state,
                pincode
            });

            if (status === 200) {
                addressDispatch({ type: "ADD_ADDRESS", payload: saveAddress })

                setFullName("");
                setFlatNo("");
                setStreetName("");
                setCity("");
                setState("");
                setPincode("");

                setDisplayAddressForm(false);
            }
            
        } catch(error) {
            console.log({error});
            console.log(error.response.data.message);
        }
    };

    return (
        <div>

            <form onSubmit={(e) => addressFormHandler(e)} className="flex w-50 my-1point5">
                <h3 className="mb-1">Please fill in the address</h3>
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
                            value="Add Address" 
                            className="btn btn-primary"
                        />
                        <button 
                            onClick={() => setDisplayAddressForm(false)}
                            className="btn btn-primary btn-red ml-15"
                        >
                            Cancel
                        </button>
                    </div>
            </form>            
        </div>
    )
}

