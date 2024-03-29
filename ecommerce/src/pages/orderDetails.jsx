import React from 'react';
import { useOrderDetailsQuery } from '../redux/api/orderAPI';
import { useLocation } from "react-router-dom";
import { SkeletonOrderDetail } from '../components/loader';

const OrderDetail = () => {
  const location = useLocation();

  // Extracting id from the pathname
  const pathname = location.pathname;
  const ids = pathname.substring(pathname.lastIndexOf('/') + 1);
  const { isLoading, data, isError, error } = useOrderDetailsQuery(ids);

  if (isLoading) {
    return <div><SkeletonOrderDetail/></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure data.orders is available before destructuring
  const {
    id,
    shippingInfo,
    user,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
    status,
    orderItems,
  } = data?.orders || {}; // Using optional chaining here to avoid errors if data.orders is undefined

  return (
    <div className="order-detail">
      <div className="order-header">
        <h2>Order #{id}</h2>
        <p>Status: {status}</p>
      </div>
      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <p>Address: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pincode}</p>
      </div>
      <div className="user-info">
        <h3>User Information</h3>
        <p>User: {user}</p>
      </div>
      <div className="order-items">
        <h3>Order Items</h3>
        {orderItems.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.photo} alt={item.name} />
            <div className="item-details">
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ${subtotal}</p>
        <p>Tax: ${tax}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Discount: ${discount}</p>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default OrderDetail;
