import { useState } from "react";
import RentalList from "./RentalsControl/RentalList";
import GetQuote from "./RentalsControl/GetQuote";

export default function RentalsControl() {
  const [cart, setCart] = useState([]);

  const handleSave = (item) => {
    setCart([...cart, item]);
  };

  return (
    <>
      <h1>Rentals</h1>
      <RentalList onSave={handleSave} />
      <GetQuote items={cart} />
    </>
  );
}
