import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Auth.scss";

export default function () {
  return (
    <div
      id="Auth"
      className="modal show xl"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <h2>Napravite Svoj Korisnicki Racun</h2>
      <Modal.Dialog size="lg">
        <Modal.Header>
          <Modal.Title>Prijava</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <FloatingLabel
              controlId="floatingInput"
              label="Korisnicko ime ili email adresa"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Korisnicko ime ili email adresa"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Sifra">
              <Form.Control type="password" placeholder="Sifr" />
            </FloatingLabel>
          </>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary">Prijava</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
