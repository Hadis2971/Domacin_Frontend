import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
        if (
          !recension.title ||
          !recension.description ||
          !recension.firstName ||
          !recension.lastName
        )
          return null;

        return (
          <div className="recension-container" key={recension.id}>
            <div className="recension-user-info">
              Korisnik: {recension.firstName} {recension.lastName}{" "}
              {recension.verified && (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">Verifikovan Korisnik</Tooltip>
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="verified-icon"
                  />
                </OverlayTrigger>
              )}
            </div>
            <div className="recension-title">{recension.title}</div>
            <div className="recension-description">{recension.description}</div>
            <div className="recension-rating">
              <Rating
                ratingSpan={5}
                ratingNumber={recension.rating}
                disabled={true}
                element={<FontAwesomeIcon icon={faStar} />}
                elementSize="2em"
                elementSelectedColor="#ffcc00"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
