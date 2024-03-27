import React from 'react'
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartItems = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler
}) => {
    const { photo, prodId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${prodId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(prodId)}>
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItems