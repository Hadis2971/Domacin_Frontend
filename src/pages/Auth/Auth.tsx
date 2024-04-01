import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useRegisterUser, useLoginUser } from "../../http/useAuth";

import "./Auth.scss";

export default function () {
  const {
    mutate: registerUser,
    isLoading: loadingRegister,
    isSuccess: isRegisterSuccess,
  } = useRegisterUser();
  const { mutate: loginUser, isLoading: loadingLogin } = useLoginUser();

  const isLoading = loadingRegister || loadingLogin;

  const [isRegisterUser, setIsRegisterUser] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    address: "",
    username: "",
    password: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (isRegisterSuccess) setIsRegisterUser(false);
  }, [isRegisterSuccess]);

  const handleChangeUserCredentials = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserCredentials((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleRegisterUser = () => {
    if (
      !userCredentials.firstName ||
      !userCredentials.lastName ||
      !userCredentials.username ||
      !userCredentials.address ||
      !userCredentials.password
    ) {
      setIsInvalid(true);
    } else {
      registerUser(userCredentials);
    }
  };

  const handleLoginUser = () => {
    if (!userCredentials.username || !userCredentials.password) {
      setIsInvalid(true);
    } else {
      loginUser(userCredentials);
    }
  };

  const toggleRegisterLogin = () => {
    if (isLoading) return;

    setIsRegisterUser(!isRegisterUser);
  };

  return (
    <div
      id="Auth"
      className="modal show xl"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <h2>
        {isRegisterUser ? "Napravite Svoj Korisnicki Racun" : "Prijavite Se"}
      </h2>
      <Modal.Dialog size="lg">
        <Modal.Header>
          <Modal.Title>
            {isRegisterUser ? "Registracija" : "Prijava"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <FloatingLabel
              controlId="floatingInput"
              label="Email adresa"
              className="mb-3"
            >
              <Form.Control
                type="username"
                placeholder="Email adresa"
                name="username"
                value={userCredentials.username}
                onChange={handleChangeUserCredentials}
                required
                isInvalid={isInvalid && !userCredentials.username}
              />
            </FloatingLabel>
            {isRegisterUser && (
              <>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Vase Ime"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Vase Ime"
                    name="firstName"
                    value={userCredentials.firstName}
                    onChange={handleChangeUserCredentials}
                    required
                    isInvalid={isInvalid && !userCredentials.firstName}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Vase Prezime"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Vase Prezime"
                    name="lastName"
                    value={userCredentials.lastName}
                    onChange={handleChangeUserCredentials}
                    required
                    isInvalid={isInvalid && !userCredentials.lastName}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Vasa Adresa"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Vasa Adresa"
                    name="address"
                    value={userCredentials.address}
                    onChange={handleChangeUserCredentials}
                    required
                    isInvalid={isInvalid && !userCredentials.address}
                  />
                </FloatingLabel>
              </>
            )}
            <FloatingLabel controlId="floatingPassword" label="Sifra">
              <Form.Control
                type="password"
                placeholder="Sifra"
                name="password"
                value={userCredentials.password}
                onChange={handleChangeUserCredentials}
                required
                isInvalid={isInvalid && !userCredentials.password}
              />
            </FloatingLabel>
          </>
        </Modal.Body>

        <Modal.Footer className="auth-footer">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={isRegisterUser ? handleRegisterUser : handleLoginUser}
              disabled={isLoading}
              className="register-login-btn"
            >
              {isLoading
                ? "Ucitava..."
                : isRegisterUser
                ? "Registracija"
                : "Prijava"}
            </Button>
          </div>

          <div className="register-login-toggle">
            <span onClick={toggleRegisterLogin}>
              {isRegisterUser ? "Prijava" : "Registracija"}
            </span>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
