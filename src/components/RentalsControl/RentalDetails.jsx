import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';



export default function RentalDetails({ item, onCloseClick }) {
    return (
        <>
        <h2>{item.brand} {item.model}</h2>
        {item.photos.map((photo, index) => 
            <img 
            key={`${item}${index}`} 
            style={{width:'300px'}}
            src={photo}/>
        )}
        <p>{item.description}</p>
        <Button variant='outline-dark'>Add to Quote</Button>
        {` `}
        <Button variant='outline-dark' onClick={onCloseClick}>Close</Button>
        </>
    )
}

RentalDetails.propTypes = {
    onCloseClick: PropTypes.func
}