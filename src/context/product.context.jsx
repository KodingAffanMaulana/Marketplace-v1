import { createContext, useState } from 'react';

import PRODUCT from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProduct] = useState(PRODUCT);
    const value = {products};

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};