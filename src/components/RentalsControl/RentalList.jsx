import inventory from './../../RentalInventory'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import styles from '@/styles/Rentals.module.css';

export default function RentalList({ onItemClick }) {
    return (
        <>
        <Container>
            <Row xs={1} md={2} className='g-4'>
                <Col>
                    {inventory.map((item) => 
                        <Card key={item.id} xs={1} lg={2} style={{ width: '25rem' }}>
                            {/* <Carousel>
                                <Carousel.Item>
                                {item.photos.map((photo, index) => 
                                    <img key={`${item}${index}`} className="d-block w-100" src={photo}/>
                                    )}
                                </Carousel.Item>
                            </Carousel> */}
                            <Card.Img 
                                variant="top" 
                                src={item.photos[0]}
                                onClick={() => onItemClick(item)}/>
                            <Card.Body>
                            
                            <Card.Title>{item.brand} {item.model}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            <Button variant="outline-dark">Add to Quote</Button>
                            </Card.Body>
                        </Card>
                        )}
                </Col>
            </Row>
        </Container>
        </>
    )
}

RentalList.propTypes = {
    onItemClick: PropTypes.func
}