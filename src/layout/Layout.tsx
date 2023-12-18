import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { LayoutProps } from "./types";

import "./Layout.scss";

export default function ({ children }: LayoutProps) {
  return (
    <Container id="main-layout" fluid className="p-0 m-0">
      <Navbar />

      <Row id="main-content" className="content-height">
        {children}
      </Row>

      <Row className="footer-height">
        <Footer />
      </Row>
    </Container>
  );
}
