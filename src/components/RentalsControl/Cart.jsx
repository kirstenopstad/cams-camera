/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterCart } from "@/utils/cart";
import styles from "@/styles/Cart.module.css"
import Table from "react-bootstrap/Table";



export default function Cart({ items, addItem, remItem, remAllItem, onClose }) {
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
      <img 
        onClick={onClose}
        src="/img/icons/x-lg.svg" 
        alt="Close cart"/>
      <Table>
        <tbody>
          {newItems.map((item) => {
            const itemName = item.model.replace(/ /g, "_");
            return (
              <tr key={itemName} >
                <td className={`${styles.qtyCell}`}>
                <img 
                  onClick={() => {addItem(item)}}
                  src="/img/icons/plus-lg.svg" 
                  alt={`Add one ${item.brand} ${item.model}`}/>
                  {count[itemName]}
                <img 
                  onClick={() => {remItem(item)}}
                  src="/img/icons/dash.svg" 
                  alt={`Remove one ${item.brand} ${item.model}`}/>
                </td>
                <td>
                {item.brand} {item.model}
                </td>
                <td>
                  <img 
                    onClick={() => {remAllItem(item)}}
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
  addItem: PropTypes.func, 
  remItem: PropTypes.func, 
  remAllItem: PropTypes.func,
  onClose: PropTypes.func
};
