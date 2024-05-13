import { useMemo } from "react";
import { Button, Card, Carousel } from "react-bootstrap";

import ImageLoading from "../../../ImageLoading";
import ImagesCarousel from "../../../Product/components/ImagesCarousel/ImagesCarousel";
import useGetIsMobileScreenView from "../../../../hooks/useGetIsMobileScreenView";

import { getArticleCategories } from "../../Article";
import { ArticleProps } from "../../types";

import "./SecondaryArticle.scss";

export default function ({
  id,
  title,
  categories,
  description,
  firstName,
  lastName,
  images,
  comments,
}: ArticleProps) {
  const CategoriesString = useMemo(
    () => getArticleCategories(categories),
    [categories]
  );

  const isMobileView = useGetIsMobileScreenView();

  const DesktopSecondaryArticleView = () => (
    <div className="DesktopSecondaryArticleView">
      <div className="inner-container">
        <ImagesCarousel id={id} images={images} />
        <div className="info-container">
          <h5>{title}</h5>

          {categories && categories.length > 0 && (
            <div className="category">{`Kategorije: ${CategoriesString}`}</div>
          )}

          <div className="description">{description}</div>
          <div className="author-name-container">
            Autor: {firstName} {lastName}
          </div>
          <div className="buttons-container">
            <Button>Saznaj Vise</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileSecondaryArticleView = () => (
    <Card className="MobileSecondaryArticleView">
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
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description?.length > 20
            ? `${description.slice(0, 60)}...`
            : description}

          {categories && categories.length > 0 && (
            <div className="category">{`Kategorije: ${CategoriesString}`}</div>
          )}

          <div>
            Autor: {firstName} {lastName}
          </div>
        </Card.Text>
        <div className="buttons-container">
          <Button>Saznaj Vise</Button>
        </div>
      </Card.Body>
    </Card>
  );

  return isMobileView ? (
    <MobileSecondaryArticleView />
  ) : (
    <DesktopSecondaryArticleView />
  );
}
