import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Loader from './components/loader'
import Header from './components/header'
import ProtectedRoute from "./components/protected-route";
import Footer from './components/footer';
import { Toaster } from "react-hot-toast";
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";


const Search = lazy(() => import("./pages/search"))
const Home = lazy(() => import('./pages/home'))
const Cart = lazy(() => import('./pages/cart'))
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/order"));
const OrderDetails = lazy(() => import("./pages/orderDetails"));
const NotFound = lazy(() => import("./pages/not-found"));
const Checkout = lazy(() => import("./pages/checkout"));

const App = () => {
  const { user, loading } = useSelector(
    (state) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        console.log("data",data)
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  },[])

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header user={user}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<Cart />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App