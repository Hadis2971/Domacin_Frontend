import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

import useGetIsMobileScreenView from "../../hooks/useGetIsMobileScreenView";

import ProductDetails from "./components/ProductDetails/ProductDetails";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import ImageLoading from "../ImageLoading";

import { Categories } from "./types";
import { ProductsContext } from "../../state/Products";
import {
  ProductAttributeVariation,
  PRODUCT_ATTRIBUTES,
} from "../../state/Products/types";
import { ProductProps } from "./types";

import "./Product.scss";

export const getProductCategories = (categories: number[] | undefined) => {
  if (!categories) return null;

  return categories.map((category) => (
    <Link
      className="product-category-link"
      to={`shop/:${category}`}
      target="_blank"
      key={category}
    >
      {Categories[category]}
    </Link>
  ));
};

export const getProductAttribute = (attribute: number) => {
  return PRODUCT_ATTRIBUTES[attribute];
};

export default function ({
  id,
  skuCode,
  name,
  shortDescription,
  longDescription,
  price,
  attribute,
  stock,
  categories,
  recensions,
  images,
}: ProductProps) {
  if (!stock && attribute.variations?.every((variation) => !variation.stock))
    return null;

  // console.log(
  //   "attributeattributeattributeattributeattributeattributeattributeattribute",
  //   attribute
  // );

  console.log("attributeattributeattributeattribute", attribute);

  const value = useContext(ProductsContext);

  const [showProductDetails, setShowProductDetails] = useState(false);

  const [selectedAttributeVariation, setSelectedAttributeVariation] = useState(
    () => (attribute?.variations ? attribute?.variations[0] : null)
  );

  useEffect(() => {
    console.log(
      "useEffectuseEffectuseEffectuseEffectuseEffect attribute",
      attribute
    );

    const variation =
      attribute?.variations?.find(
        (v) => v.id === selectedAttributeVariation?.id
      ) || null;

    console.log(
      "variationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariationvariation",
      variation
    );

    setSelectedAttributeVariation(variation);
  }, [attribute]);

  const CategoriesString = useMemo(() => getProductCategories(categories), []);

  const handleToggleShowProductDetails = () => {
    setShowProductDetails((showProductDetails) => !showProductDetails);
  };

  const handleSelectProduct = () => {
    //console.log("selectedAttributeVariation", selectedAttributeVariation);

    const selectedProduct = selectedAttributeVariation
      ? {
          productID: id,
          name,
          attribute: attribute.type,
          price: selectedAttributeVariation.price,
          stock: selectedAttributeVariation.stock,
          variationID: selectedAttributeVariation.id,
        }
      : { productID: id, name, price: Number(price), stock: Number(stock) };

    value?.handleSelectProduct(selectedProduct);
  };

  const handleChangeSelectedAttribute = (
    attribute: ProductAttributeVariation
  ) => {
    setSelectedAttributeVariation(attribute);
  };

  const isMobileView = useGetIsMobileScreenView();

  const averageRaiting = useMemo(() => {
    const raitings = recensions.map((recension) => recension.rating);

    return raitings.reduce((acc, curr) => acc + curr, 0);
  }, [recensions]);

  const DesktopProductView = () => (
    <div className="DesktopProductView">
      <div className="inner-container">
        <ImagesCarousel id={id} images={images} />
        <div className="info-container">
          <h1>{name}</h1>

          <h2 className="price">
            {price || selectedAttributeVariation?.price}KM
          </h2>

          {attribute.variations && attribute.variations.length > 0 && (
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

          <div className="stock">{`Raspolozivost: ${
            stock || selectedAttributeVariation?.stock
          }`}</div>
          {categories && categories.length > 0 && (
            <div className="category">
              <div>Kategorije:</div> {CategoriesString}
            </div>
          )}
          <div className="skuCode">{skuCode}</div>
          {!!averageRaiting ? (
            <div className="average-raiting">Ocjena: {averageRaiting}</div>
          ) : (
            <div className="average-raiting">Bez Ocjene</div>
          )}
          <div className="shortDescription">{shortDescription}</div>
          <div className="buttons-container">
            <Button onClick={handleToggleShowProductDetails}>
              Saznaj Vise
            </Button>
            <Button onClick={handleSelectProduct}>Dodaj</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileProductView = () => (
    <Card className="MobileProductView">
      {images?.length > 0 ? (
        <Carousel>
          {images.map((image, idx) => (
            <Carousel.Item key={`${image}-${idx}`}>
              <ImageLoading url={image} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
        />
      )}

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {shortDescription?.length > 20
            ? `${shortDescription.slice(0, 60)}...`
            : shortDescription}

          <div className="average-raiting">Ocjena: {averageRaiting}</div>
        </Card.Text>
        <div className="buttons-container">
          <Button onClick={handleToggleShowProductDetails}>Saznaj Vise</Button>
          <Button onClick={handleSelectProduct}>Dodaj</Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {isMobileView ? <MobileProductView /> : <DesktopProductView />}

      {showProductDetails && (
        <ProductDetails
          images={images}
          shortDescription={shortDescription}
          longDescription={longDescription}
          name={name}
          id={id}
          skuCode={skuCode}
          averageRaiting={averageRaiting}
          price={price}
          attribute={attribute}
          stock={stock || selectedAttributeVariation?.stock}
          variationID={selectedAttributeVariation?.id}
          categories={categories}
          recensions={recensions}
          onClose={() => setShowProductDetails(false)}
        />
      )}
    </>
  );
}
