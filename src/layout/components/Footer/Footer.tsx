import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import "./Footer.scss";

export default function () {
  return (
    <Container fluid id="main-footer">
      <Container>
        <Row>
          <Col>
            <Nav.Link className="d-inline mx-3">Shop</Nav.Link>
            <Link className="d-inline" to="/auth">
              Account
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
