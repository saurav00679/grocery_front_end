import React, { useState } from "react";

const OrderItem = (props)=>{
    const [rowsToShow, setRowsToShow] = useState(1);
    const orderLength = props.order.details.length;
    const [show, setShow] = useState(true);
    function resetShowRows(){
      setRowsToShow((prevVal)=>{
        return show ? orderLength : 1;
      })
      setShow(!show);
    }
    return (
    <tr>
      <td className="itemName">{props.order?.id}</td>
      <td>
        <table className="table">
         <thead>
           <tr>
             <th scope="col">Item</th>
             <th scope="col">Quantity</th>
             <th scope="col">Cost</th>
           </tr>
         </thead>
         <tbody>
           {props.order.details.slice(0, rowsToShow).map((detail)=>{
               return( <><tr>
                   <td className="item_name">{detail.item}</td>
                   <td>{detail.quantity}</td>
                   <td>{detail.cost}</td>
               </tr>
               </>)
           })}
          {orderLength > 1 ? <button className="btn btn-link" onClick={resetShowRows}> {show ? `+${orderLength-1} more` : "see less"}</button> : null}
         </tbody>
        </table>
       </td>
      <td>{props.order?.price || '-'}</td>
      <td>{props.order?.savings || '-'}</td>
    </tr>
  )
}

export default OrderItem;