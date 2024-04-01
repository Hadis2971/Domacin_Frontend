import React, { useState, useMemo, useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../../../state/Products";
import { getProductCategories } from "../../Product";
import RecensionForm from "./components/RecensionForm/RecensionForm";

import { ProductDetailsProps } from "../../types";

import "./ProductDetails.scss";

import { Product } from "../../../../state/Products/types";

const SECTIONS = {
  LONG_DESCRIPTION: 1,
  RECENSION: 2,
};

export default function ProductDetails({
  id,
  skuCode,
  name,
  shortDescription,
  longDescription,
  price,
  stock,
  categories,
  images,
  onClose,
}: ProductDetailsProps) {
  const value = useContext(ProductsContext);

  const product = value?.listOfProducts?.find((product) => product.id === id);
  const productCount = value?.selectedProducts.get(product);

  const [productQuanity, setProductQuanity] = useState(productCount);

  const [sectiodTodBeDisplayed, setSectionToBedisplayed] = useState(
    SECTIONS.LONG_DESCRIPTION
  );

  const CategoriesString = useMemo(
    () => getProductCategories(categories),
    [categories]
  );

  const handleChangeProductQuantity = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(evt.target.value) >= Number(product?.stock)) return;

    setProductQuanity(Number(evt.target.value));
  };

  const handleSetQuantity = () => {
    value?.handleSetSelectedProductQuantity(id, productQuanity);
  };

  return (
    <Modal show size="xl" id="ProductDetails" onHide={onClose}>
      <Modal.Header className="header">
        <h1>{name}</h1>
        <FontAwesomeIcon
          icon={faClose}
          className="close-icon"
          onClick={onClose}
        />
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg={6} sm={12}>
              <Carousel className="carousel-container">
                {images?.map((image) => (
                  <Carousel.Item>
                    <Image src={image} className="image" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col lg={6} sm={12}>
              <div className="mb-3">
                <div className="price mb-2">{`Cijena: ${price}KM`}</div>
                <div className="skuCode mb-2">{skuCode}</div>
                <div className="categories mb-2">{CategoriesString}</div>
                <div className="description">{shortDescription}</div>
                <div className="stock">{stock}</div>
              </div>

              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  value={productQuanity}
                  onChange={handleChangeProductQuantity}
                />

                <Button onClick={handleSetQuantity}>Dodaj</Button>
              </InputGroup>

              <Dropdown className="mb-3">
                <Dropdown.Toggle>Odaberi Pakovanje</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Pakovanje 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Pakovanje 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Pakovanje 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className="additional-info">
                SKU: <span>{skuCode}</span>
              </div>
              <div className="additional-info">
                Kategorija: <span>{CategoriesString}</span>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={12}>
              <Button
                className={`section-btns ${
                  sectiodTodBeDisplayed === SECTIONS.LONG_DESCRIPTION
                    ? "active-section-btn"
                    : ""
                }`}
                onClick={() =>
                  setSectionToBedisplayed(SECTIONS.LONG_DESCRIPTION)
                }
              >
                Opis
              </Button>
              <Button
                className={`section-btns ${
                  sectiodTodBeDisplayed === SECTIONS.RECENSION
                    ? "active-section-btn"
                    : ""
                }`}
                onClick={() => setSectionToBedisplayed(SECTIONS.RECENSION)}
              >
                Recenzije
              </Button>
            </Col>
          </Row>

          {sectiodTodBeDisplayed && (
            <Row className="mt-2">
              <Col sm={12}>
                {sectiodTodBeDisplayed === SECTIONS.RECENSION && (
                  <RecensionForm />
                )}
                {sectiodTodBeDisplayed === SECTIONS.LONG_DESCRIPTION && (
                  <div className="description">{longDescription}</div>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
