import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";

const PriceTable = ()=>{
    const [details, setDetails] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/price');
          setDetails(response.data.prices);
        } catch (err) {
          alert(err);
        }
      };

      fetchData();
    }, []);
    
    return (
      <div>
        <Header/>
        <a href="/"><button className="btn btn-info grocery-btn">Back to Grocery</button></a>

        <table className="table price-table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Unit Cost</th>
            <th scope="col">Sales Cost</th>
            <th scope="col">Min Units(for sale)</th>
          </tr>
        </thead>
        <tbody>

        {details?.map((detail)=>(    
          <tr>
            <td className="itemName">{detail?.name.toUpperCase()}</td>
            <td>{detail?.unit_price}</td>
            <td>{detail?.sales_price || '-'}</td>
            <td>{detail?.min_sales_unit || '-'}</td>
          </tr>))
          }
        </tbody>
        </table>

        <p className="condition"><strong>Condition:</strong> To avail sale, you need to buy minimum number of units.</p>
  
      </div>
      )
}
export default PriceTable;