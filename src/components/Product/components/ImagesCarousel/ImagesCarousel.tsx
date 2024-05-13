import { useEffect, useReducer } from "react";
import { styled } from "styled-components";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import ImageLoading from "../../../ImageLoading";
import { ImagesCarouselProps, ImagesCarouselPropsState } from "../../types";

import "./ImagesCarousel.scss";

const CurrentImageContainer = styled.div<{ $isSingleImage: boolean }>`
  width: 200px;
  height: ${(props) => (props.$isSingleImage ? "388.5px" : "300px")};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function reducer(
  state: ImagesCarouselPropsState,
  action: ImagesCarouselPropsState
) {
  switch (action.type) {
    case "NEXT_IMAGE":
    case "PREVIOUSE_IMAGE":
      return { currentImage: action.currentImage, type: action.type };

    case "SET_IMAGE":
      return { currentImage: action.currentImage, type: "" };

    default:
      return state;
  }
}

export default function ImagesCarousel({ id, images }: ImagesCarouselProps) {
  const [state, dispatch] = useReducer(reducer, { currentImage: 0, type: "" });

  useEffect(() => {
    const { currentImage, type } = state;

    if (type === "NEXT_IMAGE") handleAnimateNextImage(currentImage);
    else if (type === "PREVIOUSE_IMAGE")
      handleAnimatePreviousImage(currentImage);
  }, [state]);

  const handleGetNextImage = () => {
    const { currentImage } = state;

    const nextCurrentImage =
      images?.length && currentImage >= images.length - 1
        ? 0
        : currentImage + 1;

    dispatch({ type: "NEXT_IMAGE", currentImage: nextCurrentImage });
  };

  const handleGetPreviousImage = () => {
    const { currentImage } = state;

    const nextCurrentImage =
      images?.length && currentImage >= images.length - 1
        ? 0
        : currentImage + 1;

    dispatch({ type: "PREVIOUSE_IMAGE", currentImage: nextCurrentImage });
  };

  const handleSetCurrentImage = (currentImage: number) => {
    dispatch({ type: "SET_IMAGE", currentImage });
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

  if (!images?.length) return null;

  const { currentImage } = state;

  return (
    <div className="ImagesCarousel">
      <CurrentImageContainer $isSingleImage={images.length === 1}>
        {images && images[currentImage] ? (
          <ImageLoading url={images[currentImage]} />
        ) : null}
      </CurrentImageContainer>
      {images.length > 1 && (
        <div className="images-carousel-container">
          <FontAwesomeIcon
            icon={faCaretLeft}
            onClick={handleGetPreviousImage}
          />
          <div className="images-carousel">
            {images?.map((image, idx) => {
              return (
                <div
                  className="next-image"
                  key={idx}
                  onClick={() => handleSetCurrentImage(idx)}
                >
                  <Image
                    src={image}
                    className={currentImage === idx ? "active-image" : ""}
                  />
                </div>
              );
            })}
          </div>

          <FontAwesomeIcon icon={faCaretRight} onClick={handleGetNextImage} />
        </div>
      )}
    </div>
  );
}
