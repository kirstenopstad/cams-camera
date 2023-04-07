import { useState } from "react";
import RentalList from "./RentalsControl/RentalList";
import GetQuote from "./RentalsControl/GetQuote";
import Cart from "./RentalsControl/Cart";
import Awards from "./Awards";

export default function RentalsControl() {
  const [cart, setCart] = useState([]);

  const handleSave = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div id="rental-control">
      <h1>Rentals</h1>
      <RentalList onSave={handleSave} />
      <GetQuote items={cart} />
      <Awards />
    </div>
  );
}
