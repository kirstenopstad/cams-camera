import Button from 'react-bootstrap/Button'
import RentalList from './RentalsControl/RentalList'

export default function RentalsControl() {
    return (
        <>
        <RentalList />
        <Button variant='outline-dark'>Rentals</Button>
        </>
    )
}