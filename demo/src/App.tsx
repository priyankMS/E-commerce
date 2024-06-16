// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './componets/SignUp';
import Home from './pages/Home';
import Login from './componets/Login';
import About from './pages/About';
import PrivateRoute from './PrivateRoutes';

import ShopAll from './pages/Products/ShopAll';
import { AdminPanel } from './newAdmin/AdminPanel';
import { Cart } from './pages/cart/Cart';
import ProductDetails from './pages/Products/ProductDetails';
import CategoryProduct from './componets/caterory/CategoryProduct';
import ShowCosmotic from './componets/caterory/ShowCosmotic';
import ShowPc from './componets/caterory/ShowPc';
import SmartPhone from './componets/caterory/SmartPhone';
import ShowOil from './componets/caterory/ShowOil';
import SearchItem from './pages/SearchItem';
// import ForgotPassword from './componets/ForgotPassword';
import CartCheckOut from './pages/cart/CartCheckOut';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Layout from './Layout';


const App: React.FC = () => {
  return (
    <Routes>
      <Route   path="/" element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path='/admin' element={<AdminPanel/>}/>
        
        
      <Route element={<PrivateRoute />}>
         <Route   path="/about"  element={ <Layout> <About />  </Layout> } />
        {/* <Route path="/userAccount" element={ <Layout>  <UserAccount />  </Layout> } /> */}
        <Route path="/productDetail/:id"  element={ <Layout><ProductDetails /></Layout> } />
        <Route path="/cart" element={<Layout>  <Cart /> </Layout> } />
        <Route path="/cartCheckOut/:id" element={ <Layout> <CartCheckOut /> </Layout> }/>
      </Route>
        
       
        

      <Route path="/category" element={ <Layout>  <CategoryProduct /> </Layout>  } />
      <Route  path="/cosmotic" element={ <Layout> <ShowCosmotic /> </Layout> } />
      <Route path="/pc" element={ <Layout> <ShowPc /> </Layout> } />
      <Route path="/phone" element={ <Layout> <SmartPhone /> </Layout> } />
      <Route path="/oil" element={ <Layout> <ShowOil /> </Layout>  } />
      <Route path="/shopeAll" element={ <Layout> <ShopAll />  </Layout>}/>
      <Route path="/signup" element={  <Layout><SignUp /></Layout>} />
      <Route path="/login" element={<Layout> <Login /> </Layout>}/>
      {/* <Route path="/forgetPass" element={ <Layout> <ForgotPassword /></Layout> } /> */}
      <Route path="/search" element={ <Layout> <SearchItem /> </Layout> } />
      <Route path="/cancel" element={ <Layout> <Cancel /> </Layout> } />
      <Route path="/success" element={ <Layout> <Success /> </Layout> } />
      <Route  path="*" element={ <Layout> <h1>Not Found</h1> </Layout>} />

    </Routes>
  );
};

export default App;
