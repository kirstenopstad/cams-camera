/* eslint-disable @next/next/no-img-element */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "@/styles/Rental.module.css";


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
    <Card xs={1} lg={2} className={`w-[25rem] h-auto ${styles.card}`}>
      <div className={`${styles.cardCarousel}`}>
        <img
          className="object-fill w-full h-auto aspect-square"
          alt={`Picture of ${item.brand} ${item.model}`}
          src={item.photos[currentImage]}
        />
        <div className={`${styles.cardCarouselArrow}`}>
          <img 
            src='/img/icons/chevron-left.svg' 
            alt='View last image' 
            onClick={imageLeft}/>
          <img 
            src='/img/icons/chevron-right.svg' 
            alt='View next image' 
            onClick={imageRight}/>
        </div>
      </div>
      {/* <div className="flex justify-center mt-2 gap-x-4">
      </div> */}
      <Card.Body className="text-center">
        <Card.Title>
          <h3>{item.brand} {item.model}</h3>
          <p>${item.baseRate} per week</p>
        </Card.Title>
        {/* <Card.Text>{item.description}</Card.Text> */}
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
