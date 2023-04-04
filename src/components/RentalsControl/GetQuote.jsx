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
        alert('Form submitted successfully!');
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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    />
            </label>
            <label>
                Phone Number:
                <input 
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    />
            </label>
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
            <label>
                Delivery:
                <input 
                    type="checkbox"
                    value={delivery}
                    onChange={(event) =>  setDelivery(event.target.value)}
                    />
            </label>
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
            <button type="submit">Submit</button>
        </form>
        
        
        </React.Fragment>
    )
}

export default GetQuote;