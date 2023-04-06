import { useState } from "react";
import RentalList from "./RentalsControl/RentalList";
import RentalDetails from "./RentalsControl/RentalDetails";
import GetQuote from "./RentalsControl/GetQuote";
import Awards from "./Awards";

export default function RentalsControl() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSave = (item) => {
    setCart([...cart, item]);
  };

  return (
    <>
      <h1>Rentals</h1>
      {
        // if selected item show item detail else show item list
        selectedItem ? (
          <RentalDetails
            item={selectedItem}
            onCloseClick={setSelectedItem}
            onSave={handleSave}
          />
        ) : (
          <RentalList onItemClick={setSelectedItem} onSave={handleSave} />
        )
      }
      <GetQuote items={cart} />
      <Awards />
    </>
  );
}
