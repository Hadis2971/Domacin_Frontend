import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { CommentsProps } from "./types";

import "./Comments.scss";
import { useAuthUser } from "../../http/useAuth";

export default function ({
  comments,
  onPostComment,
  id,
  isLoading,
}: CommentsProps) {
  const { data: user } = useAuthUser();

  const userLoggedIn = !!user;

  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    text: "",
  });

  const handleToggleIsOpen = () => setIsOpen((isOpen) => !isOpen);

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setComment((comment) => ({ ...comment, [name]: value }));
  };

  const handlePostComment = () => {
    const hasMissingFields = Object.values(comment).some((val) => !val);

    if (hasMissingFields) return;

    onPostComment({ ...comment, articleId: id, userId: user?.id || null });
  };

  return (
    <div className="Comments">
      <div
        onClick={handleToggleIsOpen}
        className="comment-open-close-container"
      >
        <span>Komentari</span>
        {isOpen ? (
          <FontAwesomeIcon icon={faArrowUp} />
        ) : (
          <FontAwesomeIcon icon={faArrowDown} />
        )}
      </div>

      {isOpen && (
        <div className="comments-inner-container">
          <Form className="mb-3">
            <Form.Control
              name="text"
              placeholder="Tekst..."
              disabled={isLoading}
              value={comment.text}
              onChange={handleChangeInput}
            />
            <Form.Control
              name="firstName"
              placeholder="Vase Ime..."
              disabled={userLoggedIn || isLoading}
              value={comment.firstName}
              onChange={handleChangeInput}
            />
            <Form.Control
              name="lastName"
              placeholder="Vase Prezime..."
              disabled={userLoggedIn || isLoading}
              value={comment.lastName}
              onChange={handleChangeInput}
            />

            <div className="post-comment-btn-container">
              <Button
                disabled={isLoading}
                onClick={handlePostComment}
                className="post-comment-btn"
              >
                {isLoading ? "Ucitavam" : "Dodaj"}
              </Button>
            </div>
          </Form>

          {comments?.map((comment) => (
            <div className="comment-container" key={comment.id}>
              <div>{comment.text}</div>
              <div>
                <div>
                  {comment.firstName} {comment.lastName}
                </div>
                <div>{new Date(comment.timestamp).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
