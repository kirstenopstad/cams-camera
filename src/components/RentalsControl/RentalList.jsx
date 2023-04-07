import inventory from "@/data/RentalInventory";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import styles from "@/styles/RentalList.module.css";
import Rental from "./Rental";
import {v4} from "uuid";

export default function RentalList({ onSave }) {
  return (
    <>
        <Row className={styles.cards}>
          {/* <section className="lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4"> */}
            {inventory.map((item) => 
              <Col className={`sm:grid-cols-1 ${styles.cardCol}`}>
                  <Rental key={v4()} item={item} onSave={onSave} />
              </Col>
            )}
          {/* </section> */}
        </Row>
    </>
  );
}

RentalList.propTypes = {
  onSave: PropTypes.func,
};
