import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { usePostArticleComment } from "../../http/useArticle";
import { Categories } from "../Product/types";
import { ArticleProps } from "./types";

import Comments from "../Comments/Comments";

import "./Article.scss";

export const getArticleCategories = (categories: number[] | undefined) => {
  if (!categories) return null;

  return categories.map((category) => (
    <Link
      className="article-category-link"
      to={`/articles/:${category}`}
      target="_blank"
      key={category}
    >
      {Categories[category]}
    </Link>
  ));
};

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
  const { mutate, isLoading } = usePostArticleComment();

  const CategoriesString = useMemo(
    () => getArticleCategories(categories),
    [categories]
  );

  return (
    <div id="Article">
      <div id="header">
        <h3>{title}</h3>
        <h5>
          Saznaj Vise <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </h5>
      </div>

      <div id="inner-container">
        <div className="image-container">
          <img src={images[0]} />
        </div>

        <div className="info-container">
          <div className="description">{description.slice(0, 600)}</div>
          <div className="categories-author-container">
            <div className="categories-list">
              <div>Kategorije:</div>
              {CategoriesString}
            </div>
            <div>
              Autor: {firstName} {lastName}
            </div>
          </div>
        </div>
      </div>

      <Comments
        comments={comments}
        id={id}
        isLoading={isLoading}
        onPostComment={mutate}
      />
    </div>
  );
}
