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
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../../../state/Products";
import { getProductCategories, getProductAttribute } from "../../Product";
import RecensionForm from "./components/RecensionForm/RecensionForm";
import RecensionsList from "./components/RecensionsList/RecensionsList";

import { ProductDetailsProps } from "../../types";

import "./ProductDetails.scss";
import {
  ProductAttribute,
  ProductAttributeVariation,
  SelectedProduct,
} from "../../../../state/Products/types";

const SECTIONS = {
  LONG_DESCRIPTION: 1,
  RECENSION: 2,
  RECENSION_LIST: 3,
};

export default function ProductDetails({
  id,
  variationID,
  skuCode,
  name,
  averageRaiting,
  shortDescription,
  longDescription,
  price,
  attribute,
  stock,
  categories,
  images,
  recensions,
  onClose,
}: ProductDetailsProps) {
  const value = useContext(ProductsContext);

  const product = useMemo(
    () => value?.listOfProducts?.find((product) => product.id === id),
    [id]
  );

  const productCount = useMemo(() => {
    const variation = variationID
      ? product?.attribute?.variations?.find(
          (variation) => variation.id === variationID
        )
      : null;

    if (variation) return value?.selectedProducts.get(variation) || 0;
    else {
      const iterator = value?.selectedProducts.entries();
      let nextValue = iterator?.next().value;

      while (nextValue) {
        const [product, count] = nextValue;
        if (product.productID === id) return count;

        nextValue = iterator?.next().value;
      }
    }
  }, [id]);

  const [productQuanity, setProductQuanity] = useState(productCount);

  const [sectiodTodBeDisplayed, setSectionToBedisplayed] = useState(
    SECTIONS.LONG_DESCRIPTION
  );

  const [displayProductStock, setDisplayProductStock] = useState(false);

  const [selectedAttributeVariation, setSelectedAttributeVariation] = useState(
    () => (attribute?.variations ? attribute?.variations[0] : null)
  );

  const CategoriesString = useMemo(
    () => getProductCategories(categories),
    [categories]
  );

  const handleChangeProductQuantity = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const stock = product?.stock || selectedAttributeVariation?.stock;
    if (
      Number(evt.target.value) > Number(stock) ||
      Number(evt.target.value) < 0
    ) {
      setDisplayProductStock(true);
      return;
    } else {
      setDisplayProductStock(false);
      setProductQuanity(Number(evt.target.value));
    }
  };

  const handleSetQuantity = () => {
    // console.log(
    //   "handleSetQuantity",
    //   id,
    //   selectedAttributeVariation?.id,
    //   productQuanity
    // );

    value?.handleSetSelectedProductQuantity(
      id,
      selectedAttributeVariation?.id,
      productQuanity
    );
  };

  const handleChangeSelectedAttribute = (
    attribute: ProductAttributeVariation
  ) => {
    setSelectedAttributeVariation(attribute);
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
                {images?.map((image, idx) => (
                  <Carousel.Item key={`${image}-${idx}`}>
                    <Image src={image} className="image" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col lg={6} sm={12}>
              <div className="mb-3">
                <div className="price mb-1">{`Cijena: ${
                  price || selectedAttributeVariation?.price
                }KM`}</div>
                <div className="description">{shortDescription}</div>
                <div className="stock">
                  Na Zalihama: {stock || selectedAttributeVariation?.stock}
                </div>
                <div className="average-raiting">Ocjena: {averageRaiting}</div>
              </div>

              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  value={productQuanity}
                  onChange={handleChangeProductQuantity}
                />

                <Button onClick={handleSetQuantity}>Dodaj</Button>
              </InputGroup>

              {displayProductStock && (
                <Alert key={"warning"} variant={"warning"}>
                  {`Trenutno stanje proizvoda ${name} je ${
                    stock || selectedAttributeVariation?.stock
                  }`}
                </Alert>
              )}

              {attribute?.variations && attribute.variations.length > 0 && (
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>
                    {getProductAttribute(attribute.type)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {attribute.variations?.map((variation) => (
                      <Dropdown.Item
                        key={variation.id}
                        onClick={() => handleChangeSelectedAttribute(variation)}
                      >
                        {variation.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              <div className="additional-info">
                SKU: <span>{skuCode}</span>
              </div>
              <div className="additional-info">
                <div>Kategorije:</div> {CategoriesString}
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
                Dodaj Recenziju
              </Button>
              <Button
                className={`section-btns ${
                  sectiodTodBeDisplayed === SECTIONS.RECENSION_LIST
                    ? "active-section-btn"
                    : ""
                }`}
                onClick={() => setSectionToBedisplayed(SECTIONS.RECENSION_LIST)}
              >
                Recenzije
              </Button>
            </Col>
          </Row>

          {sectiodTodBeDisplayed && (
            <Row className="mt-2">
              <Col sm={12}>
                {sectiodTodBeDisplayed === SECTIONS.RECENSION && (
                  <RecensionForm productId={id} />
                )}
                {sectiodTodBeDisplayed === SECTIONS.LONG_DESCRIPTION && (
                  <div className="description">{longDescription}</div>
                )}
                {sectiodTodBeDisplayed === SECTIONS.RECENSION_LIST && (
                  <RecensionsList recensions={recensions} />
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
