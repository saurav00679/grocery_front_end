import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Header from "./Header";
import { StyledGridContainer } from './styles';

const GoToCart = ()=>{
    const navigate = useNavigate();
    let location = useLocation();
    const {quantity }= location?.state;

    const [totalDetails, setTotalDetails] = useState({});

    useEffect(() => {
      const calculateTotal = async()=>{
        try{
          const response = await axios.post('http://127.0.0.1:3000/totalCost', { quantity: quantity });
          setTotalDetails(response.data);
        }catch (err){
          alert(err);
        }
      }
      calculateTotal();
    }, [quantity])

    async function createOrder(){
      try{
        const response = await axios.post('http://127.0.0.1:3000/create', { details: totalDetails });
        console.log(response.data);
        alert("Order Created Successfully");

        navigate("/orders");
      }catch(err){
        alert(err);
      }
    }

    return(
    <>
      <Header/>
       <StyledGridContainer val ={totalDetails?.item_details?.length > 3 ? 3 : totalDetails?.item_details?.length}>
        {totalDetails?.item_details?.map((item)=>{
           return <div className="cartItem" key={item.key}>
             <img height={"150px"} width={"150px"} src={item.image_url} alt={item.name} />
             <p className="item_name">{item.item}</p>
             <p><span>Quantity: </span>{item.quantity}</p>
             <p><span>Price: </span> $ {item.cost}</p>
           </div>
         })}
       </StyledGridContainer>

      <div className="checkout_price">
        <p><span>Total Cost: </span> $ {totalDetails?.total_cost}</p>
        <p>You will make <span> savings </span> of  $ {totalDetails?.savings}</p>

        <button className="btn btn-dark" onClick={createOrder}>
          Checkout
        </button>
        <a href="/"><button className="btn btn-danger">Cancel</button></a>
      </div>
    </>)
}

export default GoToCart;
