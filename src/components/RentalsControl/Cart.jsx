/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterCart } from "@/utils/cart";
import styles from "@/styles/Cart.module.css"
import Table from "react-bootstrap/Table";



export default function Cart({ items }) {
  const [newItems, setNewItems] = useState([]);
  const [count, setCount] = useState({});

  // filter 1 of each item
  useEffect(() => {
    const checkItems = filterCart(items);
    setNewItems(checkItems.items);
    setCount(checkItems.count);
  }, [items]);

  return (
    <div className={`${styles.cart}`}>
      <h2>Cart</h2>
      <Table>
        <tbody>
          {newItems.map((item) => {
            const itemName = item.model.replace(/ /g, "_");
            return (
              <tr key={itemName}>
                <td>
                <img 
                  src="/img/icons/plus-lg.svg" 
                  alt={`Add one ${item.brand} ${item.model}`}/>
                  {count[itemName]}
                <img 
                  src="/img/icons/dash.svg" 
                  alt={`Remove one ${item.brand} ${item.model}`}/>
                </td>
                <td>
                {item.brand} {item.model}
                </td>
                <td>
                  <img 
                  src="/img/icons/trash3.svg" 
                  alt={`Remove all ${item.brand} ${item.model}`}/>
                </td>
              </tr>
            );
          }
          )}
      </tbody>
      </Table>
      
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
