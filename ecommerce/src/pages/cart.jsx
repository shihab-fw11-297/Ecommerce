import { useEffect, useState } from "react";
// import { VscError } from "react-icons/vsc";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import CartItems from "../components/cart-items";



const Cart = () => {
  const [coupanCode,setCoupanCode] = useState("");
  const [isValidCoupanCode,setIsValidCoupanCode] = useState(false);
  const cartItems = [{
    productId:"12345",
    photo:"https://media.licdn.com/dms/image/D4D22AQGPkmQXMY3wgA/feedshare-shrink_2048_1536/0/1710981912654?e=1714003200&v=beta&t=8w59np-mC44w2oaUT1E9Xd6tvo0-5PShaKFbASOuHXk",
    name:"apple",
    price:5000,
    quantity:4,
    stock:10
  }];
  const subTotal = 4000;
  const tax = Math.round(subTotal * 0.18);
  const shippingCharge = 400;
  const total = subTotal + tax + shippingCharge;
  const discount = 5;

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      if(Math.random() > 0.5) setIsValidCoupanCode(true);
      else setIsValidCoupanCode(false);
    },1000)

    return () =>{
      clearTimeout(timeOut);
      setIsValidCoupanCode(false);
    }
  },[coupanCode])
  

  return (
    <div className='cart'>
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i,idx)=>(
            <CartItems key={idx} cartItem={i} />
          )) : 
          <h1>No Data Found</h1>
        }
      </main>
      <aside>
        <p>Sub Total : ${subTotal}</p>
        <p>Shipping Charges : ${shippingCharge}</p>
        <p>Tax : ${tax}</p>
        <p>
          Discount : <em> - ${discount} </em>
        </p>
        <p>
          <b>Total : ${total}</b>
        </p>

        <input type="text" placeholder="coupan code" value={coupanCode} onChange={(e)=> setCoupanCode(e.target.value)}/>
     
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