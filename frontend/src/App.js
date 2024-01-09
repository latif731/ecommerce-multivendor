
import React, {useEffect, useState} from "react"
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
  CheckoutPage, 
  Payment, 
  OrderSuccessPage, 
  ProductDetailsPage,
  ProfilePage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
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
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopInboxPage
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
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import SellerProtectedRoute from "./routes/sellerProtectedRoute";
import {loadStripe} from "@stripe/stripe-js"
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { server } from "./server";

function App() {

const [stripeApikey, setStripeApiKey] = useState("")
  // const isAuthenticated = true

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
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
    Store.dispatch(getAllProducts())
    Store.dispatch(getAllEvents())
    getStripeApikey()
  }, [])

  // useEffect(() => {
  //   if(isSellerAuthenticated) {
  //     navigate('/shop', {replace: true})
  //   }
  // },[])
  

  return (
    <BrowserRouter>
       {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
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
          <CheckoutPage/>
        </ProtectedRoute> 
        
        }/>
        <Route path="/order/success" element={<OrderSuccessPage/>}/>
        <Route path="/profile" element={
          <ProtectedRoute 
          // isAuthenticated={isAuthenticated}
          >
            <ProfilePage/>
          </ProtectedRoute>
        }/>
           <Route
          path="profile/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
        path="profile/user/track-order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage/>
            </ProtectedRoute>
          }
        />
        







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
          <Route path="/dashboard-all-orders" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopAllOrders/> 
          </SellerProtectedRoute>

        }/>
          <Route path="/dashboard-refunds" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopAllRefunds/> 
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
        <Route path="/order/:id" element={
          <SellerProtectedRoute
          // isSellerAuthenticated={isSellerAuthenticated}
          // seller={seller}
          >
            <ShopOrderDetails/> 
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
           <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
           <Route
          path="/dashboard-settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
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
