import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import OrderItem from "./OrderItem";

const Orders = () =>{
    const [orders, setOrders] = useState([])
    useEffect(() => {
      const getOrder = async()=>{
        const response = await axios.get('http://127.0.0.1:3000/get_orders');
        console.log(response.data.orders);
        setOrders(response.data.orders)
      }
      getOrder();
    }, [])
    
    return (
    <>
      <Header title={"Your Orders"}/>

      <div className="order">
        <div className="mt-2">
          <a href="/">Go back Shopping</a>
          <table className="table mt-2">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Details</th>
                <th scope="col">Total Bill</th>
                <th scope="col">Total Savings</th>
              </tr>
            </thead>
            <tbody>

            {orders?.map((order)=><OrderItem order={order}/>)
            }
            </tbody>
          </table>
            
        </div>
      </div>
    </>
    )
}



export default Orders;