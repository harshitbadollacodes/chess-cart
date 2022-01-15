import axios from "axios";
import { API } from "../config/constants";
import { createContext, useContext, useEffect, useReducer } from "react";
import { addressReducer, initialState } from "../reducer/address/addressReducer";
import { setupAuthHeaderForServiceCalls, useAuthContext } from "./AuthContext";

const AddressContext = createContext();

export const AddressProvider = ({children}) => {

    const { token } = useAuthContext();
    const [addressState, addressDispatch] = useReducer(addressReducer, initialState);

    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    setupAuthHeaderForServiceCalls(token);
                    const {data: { address }, status} = await axios.get(`${API}/address`);

                    if (status === 200) {
                        addressDispatch({ type: "LOAD_ADDRESSES", payload: address })
                    }
                }
            } catch(error) {
                console.log(error);
            }
        })();
    }, [token])

    return (
        <AddressContext.Provider value={{addressState, addressDispatch}}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddressContext = () => {
    return useContext(AddressContext);
};