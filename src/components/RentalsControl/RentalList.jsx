import inventory from './../../RentalInventory'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import styles from '@/styles/Rentals.module.css'

export default function RentalList() {
    return (
        <>
        {inventory.map((item) => 
            <Card key={item.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.photos[0]}/>
                <Card.Body>
                <Carousel.Item>
                {item.photos.map((photo, index) => 
                    <Card.Img variant="top" key={`${item}${index}`} src={photo}/>
                )}
                </Carousel.Item>
                <Card.Title>{item.brand} {item.model}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            
            )}
        </>
    )
}