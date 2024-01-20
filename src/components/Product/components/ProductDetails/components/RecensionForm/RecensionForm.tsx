import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

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
          style={{ height: "200px" }}
          placeholder=""
        />
      </FloatingLabel>
      <Button variant="primary" type="submit" className="mt-3">
        Posalji
      </Button>
    </div>
  );
}
