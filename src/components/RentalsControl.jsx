import { useState } from 'react'
import RentalList from './RentalsControl/RentalList'
import RentalDetails from './RentalsControl/RentalDetails'
import Container from 'react-bootstrap/Container';


export default function RentalsControl() {
    const [selectedItem, setSelectedItem] = useState(null)

    // handleItemClick to update selected item
    const handleItemClick = (item) => {
        setSelectedItem(item)
    }
    // handleDetailClose to make selected item null
    const handleDetailClose = () => {
        setSelectedItem(null)
    }

    // conditional rendering 
    let content = <RentalList 
                    onItemClick={handleItemClick}
                    />
    // if selected item, content = item detail
    if (selectedItem) {
        content = <RentalDetails 
                    item={selectedItem}
                    onCloseClick={handleDetailClose}
                    />
    }

    return (
        <>
        <Container>
            <h1>Rentals</h1>
            {content}
        </Container>
        </>
    )
}