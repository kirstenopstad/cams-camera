import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cart from "./Cart";
import PropTypes from "prop-types";
import styles from '@/styles/Rentals.module.css';
import buildQuote from "@/utils/buildQuote";
import sendEmail from "../../../SendEmail";
import { filterCart } from "@/utils/cart";
import Table from 'react-bootstrap/Table';

function GetQuote({items}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState ('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [baseCharge, setBaseCharge] = useState('');
    const [deliveryFee, setDeliveryFee] = useState('');
    const [emailStatusMsg, setEmailStatusMsg] = useState(null);
    const [itemCount, setItemCount] = useState('');
    const [cartSummary, setCartSummary] = useState({});

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);


    const handleSubmit = (event) => {
        event.preventDefault();

        //Calculate the number of weeks between start and end date
        const start = new Date(startDate);
        const end = new Date(endDate);
        const numWeeks = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7)); // Round up to the nearest week
        // create filtered cart (item, qty)
        const cartSummary = filterCart(items)
        // Calculate base weekly subtotal
        let weeklySubtotal = 0;
        // for each type of item in cart
        cartSummary.items.forEach((item) => {
            // get iName var
            const iName = item.model.replace(/ /g, "_");
            // get item total = item base price * qty 
            const itemTotal = item.baseRate * cartSummary.count[`${iName}`] 
            // add item subtotal to weekly subtotal
            weeklySubtotal += itemTotal
            // add quantity to cart summary
            item.quantity = cartSummary.count[`${iName}`];
            // add item subtotal to cart summary
            item.subtotal = itemTotal
        })

        // gets items count from cart
        // const itemCount = items.length;
        // Calculate the base charge based on the number of weeks
        // const weeklyCharge = itemCount * 50; // this gives us our item per week amount

        const baseCharge = numWeeks * weeklySubtotal;
        
        //Calculate delivery fee
        const deliveryFee = delivery ? 25 : 0;//Change this to actual weekly charge

        //Calculate the total charge
        const subTotal = baseCharge + deliveryFee

        const formData = {
            quoteDate: new Date(),
            // TODO: add unique quote nummber
            quoteNumber: 1,     
            // Expecting an array of items with properties brand, model & quantity
            cart: cartSummary.items,             
            name: name,
            email: email,
            phone: phone,
            startDate: startDate,
            endDate: endDate,
            delivery: delivery,
            address: address,
            baseCharge: baseCharge,
            deliveryFee: deliveryFee,
            subTotal: subTotal,
        };
        
        //build quote message
        const emailMessage = buildQuote(formData)
        //build emailData
        const emailData = {
            emailType: "quote",
            userName: formData.name,
            userEmail: formData.email,
            userPhoneNumber: formData.phone,
            message: emailMessage,
        }
        //send email
        sendEmail(emailData)
            .then((result) => {
                if (result.status === 200) {
                    // clearForm(e);
                    setEmailStatusMsg(`Check your inbox for your quote!`)
                } else {
                    setEmailStatusMsg(`Error: ${result.status} ${result.text}`)
                }
            })

        //store locally
        localStorage.setItem('formData', JSON.stringify(formData));
        //confirmation
        // alert(`Your count is ${itemCount}`);
        //updates subtotal state
        setSubTotal(subTotal);
        setBaseCharge(baseCharge);
        setDeliveryFee(deliveryFee);
        setItemCount(itemCount);
        setCartSummary(cartSummary);
        //update formSubmitted state
        setFormSubmitted(true);
        //reset form
        setName('');
        setEmail('');
        setPhone('');
        setStartDate('');
        setEndDate('');
        setDelivery(false);
        setAddress('');

    }

    return (
        <React.Fragment>
            <h1 className={styles.headerStyle}>Get Your Quote!</h1>
            <div className={styles.cartStyle}>
            <h4>Your cart:</h4>
            <Cart items={items} />
            <hr />
            </div>
                <div className={styles.bodyStyle}>
                    {formSubmitted ? (
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Qty</th>
                                        <th>Item</th>
                                        <th>Unit Price</th>
                                        <th>Ext. Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartSummary.items.map((item) => 
                                    <tr key={item.id}>
                                        <td>{item.quantity}</td>
                                        <td>{item.brand} {item.model}</td>
                                        <td>${item.baseRate}</td>
                                        <td>${item.subtotal}</td>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                            <p>{emailStatusMsg}</p>
                            <h2>Weekly Subtotal: ${baseCharge} </h2>
                            {/* <h2>You are checking out {itemCount} items per week at $50 per item per week.</h2> */}
                            {/* <h2>Cost of duration of rental: ${baseCharge} </h2> */}
                            <h2>Delivery Cost: ${deliveryFee}</h2>
                            <h1>Est. Total: ${subTotal}</h1>
                        </div>
                    ) :(
                <form onSubmit={handleSubmit}>
                    <p>To complete the quoting process, please fill out this form:</p>
                    <p><em>Please Note: we do require a 2 week lead time for deliveries.</em></p>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input 
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={minDate}
                            placeholderText="select a start date"
                            required
                            />
                    </label>
                    <br />
                    <label>
                        End Date:
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={minDate}
                            placeholderText="select an end date"
                            required 
                            />
                    </label>
                    <br />
                    <label>
                        Delivery:
                        <input 
                            type="checkbox"
                            value={delivery}
                            onChange={(event) =>  setDelivery(event.target.value)}
                            />
                    </label>
                    <br />
                    {delivery && (
                        <label>
                            Address:
                            <input 
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                />
                        </label>
                    )}
                    <br />
                    <button type="submit">Submit</button>
                </form>
                )}
                </div>
        </React.Fragment>
    )

}

GetQuote.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default GetQuote;