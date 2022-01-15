import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { getProductsData } from "../utilityFunctions/networkCalls";
import { reducer } from "../reducer/productsReducer/productsReducer";

export const ProductContext = createContext();

export function ProductProvider({children}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const products = await getProductsData();
                setData(products);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const [state, dispatch] = useReducer(reducer, {
        sortBy: null,
        filter: false,
        fastDelivery: false
    });

    return (
        <ProductContext.Provider value={{data, state, dispatch, isLoading}}>
            {children}
        </ProductContext.Provider>
    );
};

export function useProductContext() {
    return useContext(ProductContext);
}