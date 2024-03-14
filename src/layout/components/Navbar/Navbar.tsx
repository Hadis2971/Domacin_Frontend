import { useState, useCallback, useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../../state/Products";
import { useAuthUser, useLogoutUser } from "../../../http/useAuth";
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
  const value = useContext(ProductsContext);

  const logOut = useLogoutUser();

  const { data } = useAuthUser();

  const [showOffcanvasSidebar, setShowOffcanvasSidebar] = useState(false);

  console.log(value?.selectedProducts);

  const numberOfSelectedProducts = value?.selectedProducts
    ? Object.values(value.selectedProducts).reduce(
        (curr, acc) => (acc += curr),
        0
      )
    : null;

  const openOffcanvasSidebar = useCallback(
    () => setShowOffcanvasSidebar(true),
    []
  );
  const closeOffcanvasSidebar = useCallback(
    () => setShowOffcanvasSidebar(false),
    []
  );

  return (
    <Navbar id="main-navbar" expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <Image
              className="logo"
              src="https://domacin.ba/wp-content/uploads/2022/02/cropped-cropped-cropped-logo-domacinba-270x270.png"
            />
            Domacin
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Pocetna</Link>
            <Link to="shop">Shop</Link>
            <Link to="articles">Clanci</Link>

            <Nav.Link target="_blank" href="https://www.blog.domacin.ba/">
              Arhiva
            </Nav.Link>
          </Nav>

          <Nav className="align-items-start">
            <div className="navbar-controls">
              <div>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="shopping-cart-icon"
                  onClick={openOffcanvasSidebar}
                />

                {!!numberOfSelectedProducts && (
                  <span className="number-of-selected-products">{`(${numberOfSelectedProducts})`}</span>
                )}
              </div>

              {!!data && (
                <div className="auth" onClick={logOut}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>{data.username} Odjavite Se</span>
                </div>
              )}
            </div>
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
