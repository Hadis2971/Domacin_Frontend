import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { NavbarOffcanvasProps } from "../types";

import "./NavbarOffcanvas.scss";

export default function ({
  show,
  getFormatedListOfSelectedProducts,
  handleSelectProduct,
  handleDeselectProduct,
  handleClose,
}: NavbarOffcanvasProps) {
  const products = getFormatedListOfSelectedProducts
    ? getFormatedListOfSelectedProducts()
    : [];

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {products.map((product) => (
          <div className="NavbarOffcanvasProduct">
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
      </Offcanvas.Body>
    </Offcanvas>
  );
}
