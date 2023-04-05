/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterCart } from "@/utils/cart";

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
    <div className="my-2">
      {newItems.map((item) => {
        const itemName = item.model.replace(/ /g, "_");
        return (
          <>
            <p>
              {item.brand} {item.model}{" "}
              {count[itemName] > 1 ? `* ${count[itemName]}` : null}
            </p>
          </>
        );
      })}
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
