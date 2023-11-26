import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Header from "./Header";
import Item from "./Item";

const GroceryItem = ()=>{
    const[items, setItems] = useState([]);
    const navigate = useNavigate();
    const[itemQuantity, setItemQuantity] = useState({})

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3000/getItems');
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

    function goToCart(){
      let itemAdded = false;
      Object.keys(itemQuantity).forEach(item=>{
          if(itemQuantity[item] > 0){
            itemAdded = true;
          }
      })

      if(itemAdded){
      navigate('/cart', { state: { quantity: itemQuantity } });
      }else{
        toast("All items are 0.");
      }
    }

    return(
      <div className="main">
        <Header/>
        <div className="main-btn">
          <a href="/price"><button className="btn btn-info">See Price table</button></a>
          <a href="/orders"><button className="btn btn-dark">Previous Orders</button></a>
        </div>
        
        <div className="items">
          {items.map((item)=>
            <Item 
            key={item.id}
            name ={item.name}
            url={item.image_url}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            val={itemQuantity[item.name]}
            />)
          }
        </div>

        <div>
          <div className="btn btn-primary mt-4" onClick={goToCart}>
            Go to cart
            <ToastContainer position="top-center" autoClose={1000}/>
          </div>

          <button className="btn btn-danger reset-btn" onClick={()=>window.location.reload()}>
            Reset
          </button>
        </div>
        
      </div>
    )
}

export default GroceryItem;
