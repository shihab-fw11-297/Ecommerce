import React from 'react'
import TableHOC from '../components/TableHOC'
import { Link } from 'react-router-dom';
import { useState } from "react";


const Column = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const [rows, setRows] = useState([{
    _id: "15515",
    amount: 50,
    quantity: 10,
    discount: 5,
    status: <span className='red'>Processing</span>,
    action: <Link to={"/order/abcs"}>View</Link>
  }]);

  const Table = TableHOC(Column,rows,"dashboard-product-box","Orders",rows.length > 6)();
  return (
    <div className="container">
    <h1>My Orders</h1>
    {Table}
    {/* {isLoading ? <Skeleton length={20} /> : Table} */}
  </div>
  )
}

export default Orders