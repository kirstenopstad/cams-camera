/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterCart } from "@/utils/cart";
import styles from "@/styles/Cart.module.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import GetQuote from "./GetQuote";

export default function Cart({ items, addItem, remItem, remAllItem, onClose }) {
  const [newItems, setNewItems] = useState([]);
  const [count, setCount] = useState({});
  const [showGetQuoteForm, setShowGetQuoteForm] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);

  // filter 1 of each item
  useEffect(() => {
    const checkItems = filterCart(items);
    setNewItems(checkItems.items);
    setCount(checkItems.count);
  }, [items]);

  const handleShowForm = () => {
    setShowGetQuoteForm(!showGetQuoteForm);
  };

  return (
    <div className={`${styles.cart}`}>
      <img
        loading="lazy"
        style={{ float: "right" }}
        onClick={onClose}
        src="img/icons/x-lg.svg"
        alt="Close cart"
      />
      <h2>Cart</h2>
      <Table>
        <tbody>
          {newItems.map((item) => {
            const itemName = item.model.replace(/ /g, "_");
            return (
              <tr key={itemName}>
                <td className={`${styles.qtyCell}`}>
                  <img
                    loading="lazy"
                    onClick={() => {
                      addItem(item);
                    }}
                    src="img/icons/plus-lg.svg"
                    alt={`Add one ${item.brand} ${item.model}`}
                  />
                  {count[itemName]}
                  <img
                    loading="lazy"
                    onClick={() => {
                      remItem(item);
                    }}
                    src="img/icons/dash.svg"
                    alt={`Remove one ${item.brand} ${item.model}`}
                  />
                </td>
                <td>
                  {item.brand} {item.model}
                </td>
                <td>
                  <img
                    loading="lazy"
                    onClick={() => {
                      remAllItem(item);
                    }}
                    src="img/icons/trash3.svg"
                    alt={`Remove all ${item.brand} ${item.model}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <br />
      </Table>
      {showGetQuoteForm ? (
        <GetQuote items={items} />
      ) : (
        <Button variant="outline-dark" onClick={handleShowForm}>
          Get Quote
        </Button>
      )}
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  addItem: PropTypes.func,
  remItem: PropTypes.func,
  remAllItem: PropTypes.func,
  onClose: PropTypes.func,
};
