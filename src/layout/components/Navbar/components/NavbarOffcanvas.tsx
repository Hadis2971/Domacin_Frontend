import { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../../../state/Products";

import { NavbarOffcanvasProps } from "../types";

import "./NavbarOffcanvas.scss";
import { Product } from "../../../../state/Products/types";

export default function ({
  show,
  getFormatedListOfSelectedProducts,
  handleSelectProduct,
  handleDeselectProduct,
  handleClose,
}: NavbarOffcanvasProps) {
  const value = useContext(ProductsContext);

  const products = getFormatedListOfSelectedProducts
    ? getFormatedListOfSelectedProducts()
    : [];

  const handleGoToCheckout = () => {
    handleClose();
    value?.handleToggleDisplayCheckoutModal();
  };

  //console.log("products", products);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      id="NavbarOffcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="NavbarOffcanvasTitle">
          Vasa Korpa
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {products.map((product) => (
          <div className="NavbarOffcanvasProduct" key={product.id}>
            <div>{product.name}</div>
            <div className="product-quantity">
              <FontAwesomeIcon
                icon={faArrowDown}
                onClick={
                  handleDeselectProduct
                    ? () => handleDeselectProduct(product)
                    : undefined
                }
              />
              {product.quantity}
              <FontAwesomeIcon
                icon={faArrowUp}
                onClick={
                  handleSelectProduct
                    ? () => handleSelectProduct(product)
                    : undefined
                }
                color={product.quantity >= product.stock ? "grey" : "#e91e63"}
              />
            </div>
          </div>
        ))}

        {products && products.length > 0 && (
          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant="primary"
              className="checkout-btn"
              onClick={handleGoToCheckout}
            >
              Nastavi Do Checkout
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
