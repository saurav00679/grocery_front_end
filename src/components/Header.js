import React from "react";

const Header = (props)=>{
  return(
  <header>
      <h1>{props.title ? props.title : "Buy Grocery"}</h1>
  </header>
  );
}

export default Header;
