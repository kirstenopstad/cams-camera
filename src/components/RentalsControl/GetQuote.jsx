import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import styles from "@/styles/GetQuote.module.css";
import buildQuote from "@/utils/buildQuote";
import sendEmail from "@/utils/SendEmail";
import { filterCart } from "@/utils/cart";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { collections, db } from "@/utils/firebase";
import { v4 } from "uuid";

function GetQuote({ items }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [baseCharge, setBaseCharge] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [emailStatusMsg, setEmailStatusMsg] = useState(null);
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
    const cartSummary = filterCart(items);
    // Calculate base weekly subtotal
    let weeklySubtotal = 0;
    // for each type of item in cart
    cartSummary.items.forEach((item) => {
      // get iName var
      const iName = item.model.replace(/ /g, "_");
      // get item total = item base price * qty
      const itemTotal = item.baseRate * cartSummary.count[`${iName}`];
      // add item subtotal to weekly subtotal
      weeklySubtotal += itemTotal;
      // add quantity to cart summary
      item.quantity = cartSummary.count[`${iName}`];
      // add item subtotal to cart summary
      item.subtotal = itemTotal;
    });

    const baseCharge = numWeeks * weeklySubtotal;

    //Calculate delivery fee
    const deliveryFee = delivery ? 25 : 0; //Change this to actual weekly charge

    //Calculate the total charge
    const subTotal = baseCharge + deliveryFee;

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
    const emailMessage = buildQuote(formData);

    //build emailData
    const emailData = {
      emailType: "quote",
      userName: formData.name,
      userEmail: formData.email,
      userPhoneNumber: formData.phone,
      message: emailMessage,
    };

    // send email
    sendEmail(emailData).then((result) => {
      if (result.status === 200) {
        db.collection(collections.res).doc(v4()).set(emailData);
        // clearForm(e);
        setEmailStatusMsg(`Check your inbox for your quote!`);
      } else {
        setEmailStatusMsg(`Error: ${result.status} ${result.text}`);
      }
    });

    //store locally
    // TODO: store in Firebase
    localStorage.setItem("formData", JSON.stringify(formData));

    setSubTotal(subTotal);
    setBaseCharge(baseCharge);
    setDeliveryFee(deliveryFee);
    setCartSummary(cartSummary);
    //update formSubmitted state
    setFormSubmitted(true);
    //reset form
    setName("");
    setEmail("");
    setPhone("");
    setStartDate("");
    setEndDate("");
    setDelivery(false);
    setAddress("");
  };

  return (
    <React.Fragment>
      <div className={styles.bodyStyle}>
        {formSubmitted ? (
          <div>
            <h2>Quote Estimate</h2>
            <h2>{emailStatusMsg}</h2>
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
                {cartSummary.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.quantity}</td>
                    <td>{item.brand} {item.model}</td>
                    <td>${item.baseRate}</td>
                    <td>${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className={styles.subtotal}>

            <h4 className={styles.quoteSummary}>
              <span>Weekly Subtotal:</span> 
              <span>${baseCharge} </span>
            </h4>
            <h4 className={styles.quoteSummary}>
              <span>Delivery Cost:</span> 
              <span> ${deliveryFee} </span>
            </h4>
            <h4 className={styles.quoteSummary}>
              <span><strong>Est. Total:</strong></span> 
              <span><strong>${subTotal}</strong></span>
            </h4>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <h2>Get Your Quote</h2>
            <p>
              <em>
                Please Note: we do require a 2 week lead time for deliveries.
              </em>
            </p>
            <FloatingLabel  controlId="formBasicName"
                            label="Name"
                            className="mb-3">
              <Form.Control type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Name"
                            required/>
            </FloatingLabel>
            <FloatingLabel  controlId="formBasicEmail"
                            label="Email"
                            className="mb-3">
              <Form.Control type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                            required/>
            </FloatingLabel>
            <FloatingLabel  controlId="formBasicPhone"
                            label="Phone"
                            className="mb-3">
              <Form.Control type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="123-456-7890"
                            required/>
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicStartDate">
              <Form.Label>Start Date:</Form.Label>
              <DatePicker
                className={styles.datePicker}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                placeholderText="Click to select start date"
                required
              />
            </Form.Group>            
            <Form.Group className="mb-3" controlId="formBasicEndDate">
              <Form.Label>End Date:</Form.Label>
              <DatePicker
                className={styles.datePicker}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                placeholderText="Click to select end date"
                required
              />
            </Form.Group>            
            <Form.Group className="mb-3" controlId="formBasicDelivery">
              <Form.Check
                type="checkbox"
                label="Include Delivery"
                value={delivery}
                onChange={(event) => setDelivery(event.target.value)}
              />
            </Form.Group>            
            {delivery && (
              <FloatingLabel  controlId="formBasicAddress"
              label="Address"
              className="mb-3">
                <Form.Control
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Address"
                />
              </FloatingLabel>           
            )}
            <Button variant="outline-dark" type="submit">Submit</Button> 
          </Form>
        )}
      </div>
    </React.Fragment>
  );
}

GetQuote.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default GetQuote;
