import { useState, useCallback } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { NavbarOffcanvasProps } from "./types";

import "./Navbar.scss";

const NavbarOffcanvas = ({ show, handleClose }: NavbarOffcanvasProps) => (
  <Offcanvas show={show} onHide={handleClose} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      Some text as placeholder. In real life you can have the elements you have
      chosen. Like, text, images, lists, etc.
    </Offcanvas.Body>
  </Offcanvas>
);

export default function () {
  const [showOffcanvasSidebar, setShowOffcanvasSidebar] = useState(false);

  const openOffcanvasSidebar = useCallback(
    () => setShowOffcanvasSidebar(true),
    []
  );
  const closeOffcanvasSidebar = useCallback(
    () => setShowOffcanvasSidebar(false),
    []
  );

  return (
    <Navbar
      id="main-navbar"
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <Image
            className="logo"
            src="https://domacin.ba/wp-content/uploads/2022/02/cropped-cropped-cropped-logo-domacinba-270x270.png"
          />
          Domacin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Pocetna</Nav.Link>
            <Nav.Link href="#link">Shop</Nav.Link>
            <Nav.Link href="#link">Clanci</Nav.Link>
            <Nav.Link target="_blank" href="https://www.blog.domacin.ba/">
              Arhiva
            </Nav.Link>
          </Nav>

          <Nav className="align-items-start">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="shopping-cart-icon"
              onClick={openOffcanvasSidebar}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>

      <NavbarOffcanvas
        show={showOffcanvasSidebar}
        handleClose={closeOffcanvasSidebar}
      />
    </Navbar>
  );
}
