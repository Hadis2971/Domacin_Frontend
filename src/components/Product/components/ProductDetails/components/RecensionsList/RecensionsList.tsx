import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Rating from "../../../../../Rating/Rating";

import { RecensionsListProps } from "./types";

import "./RecensionsList.scss";

export default function RecensionsList({ recensions }: RecensionsListProps) {
  if (!recensions.length)
    return (
      <h1 className="NoRecensionsListTitle">
        Budi Prvi Koji ce ostaviti recenziju
      </h1>
    );

  return (
    <div className="RecensionsList">
      {recensions.map((recension, idx) => {
        if (!recension.title || !recension.description || !recension.email)
          return;

        return (
          <div className="recension-container" key={recension.id}>
            <div className="recension-title">{recension.title}</div>
            <div className="recension-description">{recension.description}</div>
            <div className="recension-email-rating">
              <div>{recension.email}</div>
              <div>
                <Rating
                  ratingSpan={5}
                  ratingNumber={recension.rating}
                  disabled={true}
                  element={<FontAwesomeIcon icon={faStar} />}
                  elementSize="1em"
                  elementSelectedColor="#ffcc00"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
