import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../general-custom-hooks/useFetch";

let AllProductsContext = createContext()

export function useAllProductsContext() {
    return useContext(AllProductsContext)
}

let AllProductsProvider = ({children}) => {

    const { data, loading, error } = useFetch('http://localhost:5000/all-products/EPHARMA')
    
    return (
        <AllProductsContext.Provider value={{data, loading}}>
            {children}
        </AllProductsContext.Provider>
    )
}

export default AllProductsProvider