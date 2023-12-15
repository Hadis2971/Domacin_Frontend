import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import "./Footer.scss";

export default function () {
  return (
    <Container fluid id="main-footer" className="fixed-bottom">
      <Container>
        <Row>
          <Col>
            <Nav.Link className="d-inline mx-3">Shop</Nav.Link>
            <Nav.Link className="d-inline">Account</Nav.Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
