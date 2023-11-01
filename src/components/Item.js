import React from "react";

const Item = (props)=>{
  return(
    <div className="item">
      <img height={"150px"} width={"150px"} src={props.url} alt={props.name} />
      <p className="itemName">{props.name.toUpperCase()}</p>
      <label>{props.val}</label>
      <div>
        <button className="btn btn-primary" onClick={()=>props.handleIncrement(props.name, props.val)}>+</button>
        <button className="btn btn-danger" onClick={()=>props.handleDecrement(props.name, props.val)} disabled={props.val === 0}>-</button>
      </div>
    </div>
  )
}
export default Item;
