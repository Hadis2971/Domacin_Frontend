import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { LayoutProps } from "./types";

import "./Layout.scss";

export default function () {
  return (
    <Container id="main-layout" fluid className="p-0 m-0">
      <Row className="sticky-top">
        <Navbar />
      </Row>

      <Row id="main-content">
        <Outlet />
      </Row>

      <Row>
        <Footer />
      </Row>
    </Container>
  );
}
