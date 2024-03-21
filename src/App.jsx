import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from './components/loader'
import Header from './components/header'
import ProtectedRoute from "./components/protected-route";
import Footer from './components/footer';

const Search = lazy(() => import("./pages/search"))
const Home = lazy(() => import('./pages/home'))
const Cart = lazy(() => import('./pages/cart'))
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/order"));
const OrderDetails = lazy(() => import("./pages/orderDetails"));

const App = () => {
  const user = true;

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Header />
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
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </Suspense>
  )
}

export default App