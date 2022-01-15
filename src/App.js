import './App.css';
import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from "./pages/home/Home";
import { Products } from "./pages/products/Products";
import { ProductDetails } from './pages/productDetails/ProductDetails';
import { Wishlist } from './pages/wishlist/Wishlist';
import { Cart } from './pages/cart/Cart';
import { PageNotFound } from './pages/pageNotFound/PageNotFound';
import { Login } from './pages/login/Login';
import { PrivateRoute } from "./utilityFunctions/PrivateRoute";
import { Signup } from './pages/login/Signup';
import { Address } from "./pages/address/Address";
import { EditAddress } from './components/Address/EditAddress';
import { OrderConfirmation } from './pages/OrderConfirmation/OrderConfirmation';


function App() {

  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/products" element={ <Products/> } />
        <Route path="/product/:productId" element={ <ProductDetails/>} />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="*" element={ <PageNotFound/> } />
        
        <PrivateRoute path="/cart" element={ <Cart/> } />
        <PrivateRoute path="/wishlist" element={<Wishlist/>} />
        <PrivateRoute path="/address" element={ <Address/> }/>
        <PrivateRoute path="/editAddress/:addressId" element={ <EditAddress/> } />
        <PrivateRoute path="/orderConfirmed" element={ <OrderConfirmation/> } />
      </Routes>
      
    </div>
  );
}

export default App;