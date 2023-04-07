import { useState } from "react";
import RentalList from "./RentalsControl/RentalList";
import GetQuote from "./RentalsControl/GetQuote";
import Cart from "./RentalsControl/Cart";
import Awards from "./Awards";
import cartIconStyles from "@/styles/Cart.module.css"

export default function RentalsControl() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false)

  const handleSave = (item) => {
    setCart([...cart, item]);
  };

  const handleDecrementItemInCart = (item) => {
    // get first instance of this type of item
    const itemToRemove = cart.filter(i => i.id === item.id)[0]
    // get index of itemToRemove
    const indexToRemove = cart.indexOf(itemToRemove)
    // make copy of cart
    const updatedCart = [...cart]
    // splice it out of the cart
    updatedCart.splice(indexToRemove, 1)
    // update cart
    setCart(updatedCart)
  }
  
  const handleRemoveFromCart = (item) => {
    // make copy of cart that removes all instances of item
    const updatedCart = cart.filter(i => i.id != item.id)
    // update cart
    setCart(updatedCart)
  }

  const handleToggleCart = () => {
    setShowCart(!showCart)
  }

  return (
    <div id="rental-control">
      <h1>Rentals</h1>
      <RentalList onSave={handleSave} />
      { showCart ? <Cart 
                  items={cart}
                  addItem={handleSave}
                  remItem={handleDecrementItemInCart}
                  remAllItem={handleRemoveFromCart}
                  onClose={handleToggleCart}
                  /> 
              : (cart.length > 0) ? <img 
              className={cartIconStyles.cartIcon}
              onClick={handleToggleCart}
              src="/img/icons/cart.svg" 
              alt="View cart"/> 
              : null}
      <GetQuote items={cart} />
      <Awards />
    </div>
  );
}
