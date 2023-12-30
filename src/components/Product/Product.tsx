import { useState } from "react";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { ProductProps, ImagesCarouselProps } from "./types";

import useGetIsMobileScreenView from "../../hooks/useGetIsMobileScreenView";

import "./Product.scss";

function ImagesCarousel({
  images,
  currentImage,
  onHandleGetNextImage,
  onHandleGetPreviousImage,
  onSetCurrentImage,
}: ImagesCarouselProps) {
  if (!images || images.length < 3) return null;

  return (
    <div id="images-carousel-container">
      <FontAwesomeIcon icon={faCaretLeft} onClick={onHandleGetPreviousImage} />
      <div className="images-carousel">
        {images.map((image, idx) => {
          return (
            <div
              className="next-image"
              key={idx}
              onClick={() => onSetCurrentImage(idx)}
            >
              <Image
                src={image}
                className={currentImage === idx ? "active-image" : ""}
              />
            </div>
          );
        })}
      </div>

      <FontAwesomeIcon icon={faCaretRight} onClick={onHandleGetNextImage} />
    </div>
  );
}

export default function ({
  id,
  title,
  description,
  price,
  stock,
  quantity,
  categories,
  images,
}: ProductProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const isMobileView = useGetIsMobileScreenView();

  const handleGetNextImage = () => {
    const nextCurrentImage =
      currentImage >= images.length - 1 ? 0 : currentImage + 1;

    setCurrentImage(nextCurrentImage);

    handleAnimateNextImage(nextCurrentImage);
  };

  const handleGetPreviousImage = () => {
    const nextCurrentImage =
      currentImage >= images.length - 1 ? 0 : currentImage + 1;

    setCurrentImage(nextCurrentImage);

    handleAnimatePreviousImage(nextCurrentImage);
  };

  const handleAnimateNextImage = (nextCurrentImage: number) => {
    const parent = document.querySelectorAll(".images-carousel")[id - 1];
    const children = parent.getElementsByClassName("next-image");
    const firstChild = children[0];

    parent?.removeChild(children[0]);
    parent?.appendChild(firstChild);

    if (nextCurrentImage && nextCurrentImage % 2 === 0) {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.add("next-image-animation");
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("next-image-animation");
      }
    }
  };

  const handleAnimatePreviousImage = (nextCurrentImage: number) => {
    const parent = document.querySelectorAll(".images-carousel")[id - 1];
    const children = parent.getElementsByClassName("next-image");

    const firstChild = children[0];
    const secondChild = children[1];

    if (nextCurrentImage && nextCurrentImage % 2 === 0) {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.add("previous-image-animation");
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("previous-image-animation");
      }
    }

    parent?.appendChild(firstChild);
    parent?.removeChild(children[0]);
    parent?.insertBefore(secondChild, parent.childNodes[0]);
  };

  if (!images.length) return null;

  const DesktopProductView = () => (
    <div className="product-outter-container">
      <div className="product-inner-container">
        <div className="images-container">
          <div className="current-image-container">
            {images[currentImage] ? <Image src={images[currentImage]} /> : null}
          </div>
          <ImagesCarousel
            images={images}
            currentImage={currentImage}
            onHandleGetNextImage={handleGetNextImage}
            onHandleGetPreviousImage={handleGetPreviousImage}
            onSetCurrentImage={setCurrentImage}
          />
        </div>
        <div className="info-container">
          <h1>{title}</h1>

          <h2 className="price">{price}</h2>
          <div className="stock">{`Raspolozivost: ${stock}`}</div>
          {categories && categories.length > 0 && (
            <div className="category">{`Kategorije: ${categories?.join(
              ","
            )}`}</div>
          )}
          <div className="description">{description}</div>
          <div className="buttons-container">
            <Button>Saznaj Vise</Button>
            <Button>Dodaj</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileProductView = () => (
    <Card className="mobile-product-container">
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
          {description?.length > 20
            ? `${description.slice(0, 60)}...`
            : description}
        </Card.Text>
        <div className="buttons-container">
          <Button>Saznaj Vise</Button>
          <Button>Dodaj</Button>
        </div>
      </Card.Body>
    </Card>
  );

  if (isMobileView) return <MobileProductView />;

  return <DesktopProductView />;
}
