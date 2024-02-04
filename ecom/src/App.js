
import './App.css';
import Cart from './components/Cart';
import Index from './components/Index';
import Product from './components/Product';
import Profile from './components/Profile';
import Singup from './components/Singup';

import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Admin from './components/Admin';
import Sale from './components/Sale';
import { ProductsProvider } from './context/ApiContext';
import Dyna from './components/Dyna';
import { AuthProvider } from './context/AuthContext';
import { CopnProvider } from './context/Copn';
import Singin from './components/Signin';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Fav from './components/Fav';
import Contact from './components/Contact';
import { SaleProvider } from './context/SaleContext';
import { FavProvider } from './context/FavContext';
import Home from './components/Home';

function App() {
  
  return (
    <>
   <Router>
   <CartProvider>
    <FavProvider>
   <AuthProvider>
   
   
      
   
   
        <ProductsProvider>
        
          <SaleProvider>
            
         <Routes>
         <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/n" element={<Index/>}></Route>
          <Route exact path="/product/:productid" element={<ProductsProvider><Product/></ProductsProvider>}></Route>
          <Route exact path="/contact" element={<Contact/>}></Route>
          <Route exact path="/cart/" element={ <CopnProvider><Cart/> </CopnProvider> }></Route>
          <Route exact path="/fav" element={<Fav/>}></Route>
          <Route exact path="/profile" element={<UserProvider><Profile/></UserProvider>}></Route>
          <Route exact path="/admin" element={<Admin/>}></Route>
          <Route exact path="/sale" element={<Sale/>}></Route>
          <Route exact path="/d/:productcato" element={<Dyna/>}></Route>
          </Routes>
          </SaleProvider>
          
          </ProductsProvider>
         
          
      
      
      
      </AuthProvider>
      </FavProvider>
      </CartProvider>
      </Router>
      
    </>
  );
}

export default App;
