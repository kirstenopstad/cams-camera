import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


function GetQuote() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState ('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            name: name,
            phone: phone,
            startDate: startDate,
            endDate: endDate,
            delivery: delivery,
            address: address
        };
        
        //store locally
        localStorage.setItem('formData', JSON.stringify(formData));
        //confirmation
        alert('form submitted successfully!');
        //reset form
        setName('');
        setPhone('');
        setStartDate('');
        setEndDate('');
        setDelivery(false);
        setAddress('');
    }




    return (
        <React.Fragment>
            <h1>Get Your Quote!</h1>
            <h4>Your cart:</h4>
            {/* Place holder 
                text for the
                cart props or 
                whatever */}

            <p>To complete the quoting process, please fill out this form:</p>
            <p><em>Please Note: we do require a 2 week lead time for deliveries.</em></p>
                <form onSubmit={handleSubmit}>
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
                            placeholderText="select a start date"
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
                            placeholderText="select an end date"
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
        </React.Fragment>
    )
}

export default GetQuote;