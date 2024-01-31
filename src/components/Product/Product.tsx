import { useState } from "react";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

import useGetIsMobileScreenView from "../../hooks/useGetIsMobileScreenView";

import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import { ProductProps } from "./types";

import "./Product.scss";

export default function ({
  id,
  title,
  shortDescription,
  longDescription,
  price,
  stock,
  quantity,
  categories,
  images,
}: ProductProps) {
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleToggleShowProductDetails = () => {
    setShowProductDetails((showProductDetails) => !showProductDetails);
  };

  const isMobileView = useGetIsMobileScreenView();

  const DesktopProductView = () => (
    <div id="DesktopProductView">
      <div className="inner-container">
        <ImagesCarousel id={id} images={images} />
        <div className="info-container">
          <h1>{title}</h1>

          <h2 className="price">{price}KM</h2>
          <div className="stock">{`Raspolozivost: ${stock}`}</div>
          {categories && categories.length > 0 && (
            <div className="category">{`Kategorije: ${categories?.join(
              ","
            )}`}</div>
          )}
          <div className="shortDescription">{shortDescription}</div>
          <div className="buttons-container">
            <Button onClick={handleToggleShowProductDetails}>
              Saznaj Vise
            </Button>
            <Button>Dodaj</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileProductView = () => (
    <Card id="MobileProductView">
      {images?.length > 0 ? (
        <Carousel>
          {images.map((image) => (
            <Carousel.Item>
              <Image src={image} />
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
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {shortDescription?.length > 20
            ? `${shortDescription.slice(0, 60)}...`
            : shortDescription}
        </Card.Text>
        <div className="buttons-container">
          <Button>Saznaj Vise</Button>
          <Button>Dodaj</Button>
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
          title={title}
          id={id}
          price={price}
          onClose={() => setShowProductDetails(false)}
        />
      )}
    </>
  );
}
