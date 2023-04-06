/* eslint-disable @next/next/no-img-element */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Rental({ item, onSave }) {
  const [currentImage, setCurrentImage] = useState(0);

  const imageLeft = () => {
    let newCurrent = currentImage - 1;
    if (newCurrent < 0) {
      newCurrent = item.photos.length - 1;
    }
    setCurrentImage(newCurrent);
  };

  const imageRight = () => {
    let newCurrent = currentImage + 1;
    if (newCurrent >= item.photos.length) {
      newCurrent = 0;
    }
    setCurrentImage(newCurrent);
  };

  return (
    <Card xs={1} lg={2} className="w-[25rem] h-auto">
      <img
        className="object-fill w-full h-auto aspect-square"
        alt={`Picture of ${item.brand} ${item.model}`}
        src={item.photos[currentImage]}
      />
      <div className="flex justify-center mt-2 gap-x-4">
        <button className="inline w-10 border-black border-spacing-1 border-[0.07rem] border-opacity-60 rounded-md hover:text-white hover:bg-neutral-800 font-semibold" onClick={imageLeft}>{`<`}</button>
        <button className="inline w-10 border-black border-spacing-1 border-[0.07rem] border-opacity-60 rounded-md hover:text-white hover:bg-neutral-800 font-semibold" onClick={imageRight}>{`>`}</button>
      </div>
      <Card.Body className="text-center">
        <Card.Title>
          {item.brand} {item.model}
        </Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="outline-dark" onClick={() => onSave(item)}>
          Add to Quote
        </Button>
      </Card.Body>
    </Card>
  );
}

Rental.propTypes = {
  item: PropTypes.object,
  onSave: PropTypes.func,
};
