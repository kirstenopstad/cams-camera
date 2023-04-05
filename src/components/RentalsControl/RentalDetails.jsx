/* eslint-disable @next/next/no-img-element */
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export default function RentalDetails({ item, onCloseClick, onSave }) {
  return (
    <>
      <h2>
        {item.brand} {item.model}
      </h2>
      {item.photos.map((photo, index) => (
        <img key={`${item}${index}`} alt={`Picture of ${item.brand} ${item.model}`} style={{ width: "300px" }} src={photo} />
      ))}
      <p>{item.description}</p>
      <Button variant="outline-dark" onClick={() => onSave(item)}>Add to Quote</Button>
      <Button variant="outline-dark" onClick={() => onCloseClick(null)}>
        Close
      </Button>
    </>
  );
}

RentalDetails.propTypes = {
  onCloseClick: PropTypes.func,
  onSave: PropTypes.func
};
