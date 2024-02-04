import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { ArticleProps } from "./types";

import "./Article.scss";

export default function ({
  title,
  category,
  description,
  author,
  image,
}: ArticleProps) {
  return (
    <div id="Article">
      <div id="header">
        <h2>
          {title} - {category}
        </h2>
        <h4>
          Saznaj Vise <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </h4>
      </div>

      <div id="inner-container">
        <div className="image-container">
          <img src={image} />
        </div>

        <div className="info-container">
          <div className="description">
            {description.slice(0, 600)} - Citaj Vise
          </div>
          <h4>Autor: {author}</h4>
        </div>
      </div>
    </div>
  );
}
