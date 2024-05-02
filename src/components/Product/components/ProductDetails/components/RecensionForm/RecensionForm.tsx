import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Rating from "../../../../../Rating/Rating";
import { useAuthUser } from "../../../../../../http/useAuth";
import { useRecension } from "../../../../../../http/useProducts";

import { RecensionFormProps } from "./types";

import "./RecensionForm.scss";

export default function RecensionForm({ productId }: RecensionFormProps) {
  const { data } = useAuthUser();

  const { mutate, isLoading, isSuccess, isError } = useRecension();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 0,
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
  });

  const handleChangeFormData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleChangerating = (rating: number) => {
    setFormData((formData) => ({
      ...formData,
      rating,
    }));
  };

  const handleAddRecension = () => {
    const payload = { ...formData, userId: data?.id, productId };

    mutate(payload);

    setFormData({
      title: "",
      description: "",
      rating: 0,
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
    });
  };

  return (
    <div id="RecensionForm">
      <h1>Budi prvi koji će recenzirati Cookies</h1>
      <FloatingLabel controlId="floatingInput" label="Naziv" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Nazi Recenzije"
          name="title"
          value={formData.title}
          onChange={handleChangeFormData}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Ime" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Vase Ime"
          name="firstName"
          value={formData.firstName}
          onChange={handleChangeFormData}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Prezime" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Vase Prezime"
          name="lastName"
          value={formData.lastName}
          onChange={handleChangeFormData}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingRecenzija" label="Recenzija">
        <Form.Control
          as="textarea"
          style={{ height: "200px", marginBottom: "10px" }}
          placeholder="Recenzija"
          name="description"
          value={formData.description}
          onChange={handleChangeFormData}
        />
      </FloatingLabel>
      <Rating
        ratingSpan={5}
        element={<FontAwesomeIcon icon={faStar} />}
        elementSize="2em"
        elementSelectedColor="#ffcc00"
        onSelect={handleChangerating}
      />
      <Button
        variant="primary"
        onClick={handleAddRecension}
        disabled={isLoading}
        className="mt-3"
      >
        {isLoading ? "Ucitivam" : "Posalji"}
      </Button>

      {isSuccess ? (
        <h2 className="success-recension">Uspjesno ste postavili Recenziju</h2>
      ) : isError ? (
        <h2 className="fail-recension">
          Doslo je do greske pokusatje ponovo kasnije
        </h2>
      ) : null}
    </div>
  );
}
