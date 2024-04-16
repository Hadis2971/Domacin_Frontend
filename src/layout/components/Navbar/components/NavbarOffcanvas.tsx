import { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../../../state/Products";
import { User } from "../../../../http/useAuth";
import { useOrderProducts } from "../../../../http/useProducts";

import { NavbarOffcanvasProps } from "../types";

import "./NavbarOffcanvas.scss";

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

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
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
                    ? () => handleDeselectProduct(product.id)
                    : undefined
                }
              />
              {product.quantity}
              <FontAwesomeIcon
                icon={faArrowUp}
                onClick={
                  handleSelectProduct
                    ? () => handleSelectProduct(product.id)
                    : undefined
                }
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
