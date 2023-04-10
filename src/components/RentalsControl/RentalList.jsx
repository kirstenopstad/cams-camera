import inventory from "@/data/RentalInventory";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import styles from "@/styles/RentalList.module.css";
import Rental from "./Rental";
import { v4 } from "uuid";

export default function RentalList({ onSave }) {
  return (
    <>
      <Row className={styles.cards}>
        {inventory.map((item) => (
          <Col key={v4()} className={`sm:grid-cols-1 ${styles.cardCol}`}>
            <Rental item={item} onSave={onSave} />
          </Col>
        ))}
      </Row>
    </>
  );
}

RentalList.propTypes = {
  onSave: PropTypes.func,
};
