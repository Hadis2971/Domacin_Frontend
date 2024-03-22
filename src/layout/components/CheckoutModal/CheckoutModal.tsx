import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useQueryClient } from "react-query";

import { User } from "../../../http/useAuth";
import { useOrderProducts } from "../../../http/useProducts";
import { ProductsContext } from "../../../state/Products";

import "./CheckoutModal.scss";

export default () => {
  const value = useContext(ProductsContext);
  const { mutate, isLoading } = useOrderProducts();

  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as User;

  const products = value?.getFormatedListOfSelectedProducts
    ? value.getFormatedListOfSelectedProducts()
    : [];

  const handleCheckout = () => {
    if (!user || !userAddress || !userEmail) {
      setIsInvalid(true);
    } else {
      const order = products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      mutate({
        userId: user.id,
        order,
      });
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    if (name === "userAddress") setUserAddress(value);
    else setUserEmail(value);
  };

  return (
    <Modal show={true} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Vasa Korpa</Modal.Title>
      </Modal.Header>
      <Modal.Body className="CheckoutModalContent">
        {products.map((product) => (
          <div className="product-container">
            <div>Proizvod: {product.name}</div>
            <div>Kolicina: {product.quantity}</div>
          </div>
        ))}

        {!!user ? (
          <div>Address</div>
        ) : (
          <>
            <Form.Control
              type="text"
              placeholder="Vasa Adresa"
              name="userAddress"
              value={userAddress}
              onChange={handleInputChange}
              isInvalid={isInvalid && !userAddress}
              className="mt-5"
            />

            <Form.Control
              type="text"
              placeholder="Vasa Email Adresa"
              name="userEmail"
              value={userEmail}
              onChange={handleInputChange}
              isInvalid={isInvalid && !userEmail}
              className="mt-2"
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="CheckoutModalFooter">
        <Button
          variant="secondary"
          disabled={isLoading}
          className="close-btn"
          onClick={value?.handleToggleDisplayCheckoutModal}
        >
          Zatvori
        </Button>
        <Button
          variant="primary"
          className="checkout-btn"
          disabled={isLoading}
          onClick={handleCheckout}
        >
          {isLoading ? "Ucitava" : "Naruci"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
