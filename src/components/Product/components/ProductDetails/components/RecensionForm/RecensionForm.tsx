import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Rating from "../../../../../Rating/Rating";

import "./RecensionForm.scss";

export default function RecensionForm() {
  return (
    <div id="RecensionForm">
      <h1>Budi prvi koji će recenzirati Cookies</h1>
      <FloatingLabel controlId="floatingInput" label="Naziv" className="mb-3">
        <Form.Control as="textarea" placeholder="" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
        <Form.Control as="textarea" placeholder="" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingRecenzija" label="Recenzija">
        <Form.Control
          as="textarea"
          style={{ height: "200px", marginBottom: "10px" }}
          placeholder=""
        />
      </FloatingLabel>
      <Rating
        ratingSpan={5}
        element={<FontAwesomeIcon icon={faStar} />}
        elementSize="2em"
        elementSelectedColor="#ffcc00"
      />
      <Button variant="primary" type="submit" className="mt-3">
        Posalji
      </Button>
    </div>
  );
}
