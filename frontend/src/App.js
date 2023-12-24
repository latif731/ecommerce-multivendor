import React, {useEffect} from "react"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import { 
  LoginPage, 
  SignUpPage, 
  ActivationPage, 
  HomePage, 
  ProductPage, 
  BestSellingPage, 
  EventsPage, 
  FAQPage, 
  Checkout, 
  Payment, 
  OrderSuccessPage, 
  ProductDetailsPage,
  ProfilePage,
} from './routes/Routes';
import { 
  ShopCreatePage, 
  ShopActivation, 
  ShopLoginPage, 
  ShopDashboardPage, 
  ShopHomePage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopWithDrawMoneyPage,
  ShopPreviewPage
} from "./routes/ShopRoutes"
import {ToastContainer} from "react-toastify"
import axios from "axios"
import {toast} from "react-toastify"
import Store from "./redux/store"
import { loadUser } from "./redux/actions/user";
// import Events from "./components/events/Events";
import  ProtectedRoute  from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { loadSeller } from "./redux/actions/user";
import SellerProtectedRoute from "./routes/sellerProtectedRoute";



function App() {

  // const isAuthenticated = true
  const {loading, isAuthenticated} = useSelector((state) => state.user)
  console.log("user",isAuthenticated)
  const { isLoading, isSellerAuthenticated, seller } = useSelector((state) =>  state.seller)
  console.log("seller" , isSellerAuthenticated)
  useEffect(() => {
    // axios.get(`http://localhost:5000/api/v2/user/get-user`, 
    // {withCredentials: true})
    // .then((res) => {
    // toast.success(res.data.message)
    // }).catch((err) => {
    //   toast.error(err.response.data.message)
    // })
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
    if(isSellerAuthenticated === true){
      return <Navigate to="/shop" replace/>
    }
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
        <Route path='/seller/activation/:activation_token' element={<ShopActivation/>}/>
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>
        <Route path="/best-selling" element={<BestSellingPage/>}/>
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/faq" element={<FAQPage/>}/>
        <Route path="/checkout" element={
        <ProtectedRoute 
        // isAuthenticated={isAuthenticated}
        >
          <Checkout/>
        </ProtectedRoute>
        
        }/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/order/success/:id" element={<OrderSuccessPage/>}/>
        <Route path="/profile" element={
          <ProtectedRoute 
          // isAuthenticated={isAuthenticated}
          >
            <ProfilePage/>
          </ProtectedRoute>
        }/>

        {/* shop route */}
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route path="/shop-create" element={<ShopCreatePage/>}/>
        <Route path="/shop-login" element={<ShopLoginPage/>}/>
        <Route path="/shop/:id" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopHomePage/> 
          </SellerProtectedRoute>

        }/>
        <Route path="/dashboard" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopDashboardPage/> 
          </SellerProtectedRoute>

        }/>
        <Route path="/dashboard-create-products" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopCreateProduct/> 
          </SellerProtectedRoute>

        }/>
        <Route path="/dashboard-all-products" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopAllProducts/> 
          </SellerProtectedRoute>

        }/>
          <Route path="/dashboard-create-events" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopCreateEvents/> 
          </SellerProtectedRoute>

        }/>
          <Route path="/dashboard-all-events" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopAllEvents/> 
          </SellerProtectedRoute>

        }/>
          <Route path="/dashboard/coupounds" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopAllCoupons/> 
          </SellerProtectedRoute>

        }/>
           <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        {/* <Route element={<SellerProtectedRoute
        isSellerAuthenticated={isSellerAuthenticated}
        seller={seller}
        />}>
          <Route path="/shop/:id" element={<ShopHomePage/>}/>
        </Route> */}
      </Routes>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </BrowserRouter>
  );
}

export default App;
