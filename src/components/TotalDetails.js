import React from "react";

const TotalDetails = (props)=>{
    return (
      <div className="details">
        <h2>Price Calculated</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>

          {props.itemDetails.map((detail)=>(    
            <tr key={detail.key}>
              <td className="itemName">{detail.item.toUpperCase()}</td>
              <td>{detail.quantity}</td>
              <td>{detail.cost}</td>
            </tr>))
            }
          </tbody>
        </table>

        <h5>Total price: ${props.total_cost}</h5>
        {props.savings !== 0 ? <h5>You saved $ {props.savings} today.</h5> : null }
      </div>
    )
}

export default TotalDetails;