/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterCart } from "@/utils/cart";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';


export default function Cart({ items, addItem, remItem, remAllItem }) {
  const [newItems, setNewItems] = useState([]);
  const [count, setCount] = useState({});

  // filter 1 of each item
  useEffect(() => {
    const checkItems = filterCart(items);
    setNewItems(checkItems.items);
    setCount(checkItems.count);
  }, [items]);

  return (
    <Container>
      <h2>Quote Summary</h2>
      <Table>
        <tbody>
        {newItems.map((item) => {
          const itemName = item.model.replace(/ /g, "_");
          return (
            <tr key={itemName}>
              <td>
                <img src="/img/icons/plus-lg.svg" alt="increment item quantity" onClick={() => addItem(item)}/>
                {count[itemName]}
                <img src="/img/icons/dash.svg" alt="decrement item quantity" onClick={() => remItem(item)}/>
              </td>
              <td>
                {item.brand} {item.model}
              </td>
              <td>
                <img src="/img/icons/trash3.svg" alt="remove all of this item" onClick={() => remAllItem(item)}/>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </Container>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  addItem: PropTypes.func,
  remItem: PropTypes.func,
  remAllItem: PropTypes.func
};
