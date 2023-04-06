import inventory from "@/data/RentalInventory";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import styles from "@/styles/Rentals.module.css";
import Rental from "./Rental";
import {v4} from "uuid";

export default function RentalList({ onSave }) {
  return (
    <>
      <Container>
        <Row xs={1} md={2} className={`g-4 ${styles.cards}`}>
          <Col>
            {inventory.map((item) => {
              return <Rental key={v4()} item={item} onSave={onSave} />;
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

RentalList.propTypes = {
  onSave: PropTypes.func,
};
