import { useContext, useEffect, useState } from "react";
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
  const { mutate, isLoading, isSuccess, isError } = useOrderProducts();

  const [orderUserInfo, setOrderUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [isInvalid, setIsInvalid] = useState(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as User;

  useEffect(() => {
    if (isSuccess) {
      value?.handleDeselectAllProducts();
      value?.handleToggleDisplayCheckoutModal();
    }
  }, [isSuccess]);

  // console.log(
  //   "value.getFormatedListOfSelectedProductsvalue.getFormatedListOfSelectedProducts",
  //   value?.getFormatedListOfSelectedProducts
  // );

  const products = value?.getFormatedListOfSelectedProducts
    ? value.getFormatedListOfSelectedProducts()
    : [];

  // console.log(
  //   "CheckoutModalCheckoutModalCheckoutModalCheckoutModalCheckoutModalCheckoutModal",
  //   products
  // );

  const handleCheckout = () => {
    if (
      !user &&
      (!orderUserInfo.firstName ||
        !orderUserInfo.lastName ||
        !orderUserInfo.address)
    ) {
      setIsInvalid(true);
    } else {
      const order = products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
        attribute: product.attribute,
        variationID: product.variationID,
      }));

      mutate({
        userId: user?.id,
        firstName: user?.firstName || orderUserInfo.firstName,
        lastName: user?.lastName || orderUserInfo.lastName,
        address: user?.address || orderUserInfo.address,
        email: user?.username || orderUserInfo.email,
        order,
      });
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setOrderUserInfo((orderUserInfo) => ({ ...orderUserInfo, [name]: value }));
  };

  return (
    <Modal
      show={true}
      animation={false}
      onHide={value?.handleToggleDisplayCheckoutModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Vasa Korpa</Modal.Title>
      </Modal.Header>
      <Modal.Body className="CheckoutModalContent">
        {products.map((product) => (
          <div className="product-container" key={product.id}>
            <div>Proizvod: {product.name}</div>
            <div>Kolicina: {product.quantity}</div>
          </div>
        ))}

        {!!user ? (
          <div className="checkout-user-info">
            <div>Vase Ime: {user.firstName}</div>
            <div>Vase Prezime: {user.lastName}</div>
            <div>Vasa Adresa: {user.address}</div>
          </div>
        ) : (
          <>
            <Form.Control
              type="text"
              placeholder="Vase Ime"
              name="firstName"
              value={orderUserInfo.firstName}
              onChange={handleInputChange}
              isInvalid={isInvalid && !orderUserInfo.firstName}
              className="mt-5"
            />

            <Form.Control
              type="text"
              placeholder="Vase Prezime"
              name="lastName"
              value={orderUserInfo.lastName}
              onChange={handleInputChange}
              isInvalid={isInvalid && !orderUserInfo.lastName}
              className="mt-2"
            />

            <Form.Control
              type="text"
              placeholder="Vasa Adresa"
              name="address"
              value={orderUserInfo.address}
              onChange={handleInputChange}
              isInvalid={isInvalid && !orderUserInfo.address}
              className="mt-2"
            />

            <Form.Control
              type="text"
              placeholder="Vasa Email Adresa"
              name="email"
              value={orderUserInfo.email}
              onChange={handleInputChange}
              className="mt-2"
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="CheckoutModalFooter">
        <Button
          disabled={isLoading}
          className="close-btn"
          onClick={value?.handleToggleDisplayCheckoutModal}
        >
          Zatvori
        </Button>
        <Button
          className="checkout-btn"
          disabled={isLoading}
          onClick={handleCheckout}
        >
          {isLoading ? "Ucitava" : "Naruci"}
        </Button>

        {isSuccess && (
          <div className="success-checkout-msg">
            Narudzba je Uspjesno Poslana
          </div>
        )}

        {isError && (
          <div className="fail-checkout-msg">
            Doslo je do Greske Pokusajte Malo Kasnije Ponovo
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};
