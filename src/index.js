import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './context/ProductsContext';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AddressProvider } from './context/AddressContext';



ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <AddressProvider>
              <Router>
                <App/>
              </Router>
            </AddressProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
