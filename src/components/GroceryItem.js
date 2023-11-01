import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Item from "./Item";
import TotalDetails from "./TotalDetails";

const GroceryItem = ()=>{
    const[items, setItems] = useState([]);
    const[itemQuantity, setItemQuantity] = useState({})
    const [totalDetails, setTotalDetails] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/getItems');
          const data = response.data.items
          setItems(data);

          data.forEach((d)=>{
            setItemQuantity(prevVal=>{
              return { ...prevVal, [d.name]: 0}
            })
          })

        } catch (err) {
          alert(err);
        }
      };

      fetchData();
    }, []);

    function handleIncrement(item, count){
      setItemQuantity((prevVal)=>{
        return {...prevVal, [item]: count + 1 }
      });
    }

    function handleDecrement(item, count){
      setItemQuantity((prevVal)=>{
        return {...prevVal, [item]: count - 1 }
      });
    }

    async function calculateTotal(){ 
      let itemAdded = false;
      Object.keys(itemQuantity).forEach(item=>{
          if(itemQuantity[item] > 0){
            itemAdded = true;
          }
      })

      if(itemAdded){
        try{
          const response = await axios.post('http://127.0.0.1:3001/totalCost', {quantity: itemQuantity });
          setTotalDetails(response.data);
        }catch (err){
          alert(err);
        }
      }else{
        alert("All items are 0.");
      }
    }

    return(
      <div className="main">
        <Header/>

        <a href="/price"><button className="btn btn-info">See Price table</button></a>
        <div className="items">
          {items.map((item)=>
            <Item 
            key={item.key}
            name ={item.name}
            url={item.image_url}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            val={itemQuantity[item.name]}
            />)
          }
        </div>

        <button className="btn btn-primary" onClick={calculateTotal}>
          Calculate Total
        </button>

        <button className="btn btn-danger reset-btn" onClick={()=>window.location.reload()}>
          Reset
        </button>

        {Object.keys(totalDetails).length !== 0 ? 
          <TotalDetails
            itemDetails={totalDetails.item_details}
            savings={totalDetails.savings}
            total_cost={totalDetails.total_cost} 
          />
        : null}
      </div>
    )
}
export default GroceryItem;
