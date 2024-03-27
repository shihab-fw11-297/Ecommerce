import { useEffect, useState } from "react";
import axios from "axios";
import { BiError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/cart-items";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
  discountApplied
} from "../redux/reducer/cartReducer";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [coupanCode, setCoupanCode] = useState("");
  const [isValidCoupanCode, setIsValidCoupanCode] = useState(false);


  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${coupanCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCoupanCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCoupanCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCoupanCode(false);
    };
  }, [coupanCode]);

  const incrementHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };


  const removeHandler = (prodId) => {
    console.log("***",prodId)
    dispatch(removeCartItem(prodId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className='cart'>
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i, idx) => (
            <CartItems
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i} />
          )) :
            <h1>No Data Found</h1>
        }
      </main>
      <aside>
        <p>Sub Total : ${subtotal}</p>
        <p>Shipping Charges : ${shippingCharges}</p>
        <p>Tax : ${tax}</p>
        <p>
          Discount : <em> - ${discount} </em>
        </p>
        <p>
          <b>Total : ${total}</b>
        </p>

        <input type="text" placeholder="coupan code" value={coupanCode} onChange={(e) => setCoupanCode(e.target.value)} />

        {coupanCode &&
          (isValidCoupanCode ? (
            <span className="green">
              ₹{discount} off using the <code>{coupanCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <BiError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  )
}

export default Cart