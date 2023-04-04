/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Cart({ items }) {
  const [newItems, setNewItems] = useState([]);
  const [count, setCount] = useState({});

  // filter 1 of each item
  useEffect(() => {
    let checkItems = [];
    let itemCount = {};
    setNewItems(
      items.filter((i) => {
        const iName = i.model.replace(/ /g, "_");
        if (checkItems.includes(i)) {
          itemCount[iName] += 1;
          return false;
        } else {
          checkItems.push(i);
          itemCount[iName] = 1;
          return true;
        }
      })
    );
    setCount(itemCount);
  }, [items]);

  return (
    <div className="my-2">
      {newItems.map((item) => {
        const itemName = item.model.replace(/ /g, "_");
        return (
          <>
            <p>
              {item.brand} {item.model} {count[itemName] > 1 ? `* ${count[itemName]}` : null}
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
