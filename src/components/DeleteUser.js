import React from "react";
import "./User.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function DeleteUserModal(props) {
  const handleDelete = () => {
    const headers = {
      Authorization:
        "Bearer 7f9912c5ee3bf743fb5e548ba9b9ca45444351294ebd7c50c5841799146741d8",
      "Content-type": "application/json",
    };
    axios
      .delete(`https://gorest.co.in/public-api/users/${props.id}`, { headers })
      .then((response) => console.log(response.data))
      .then(() => console.log("User deleted."))
      .then(() => {
        let modifiedUsers = props.users.filter(
          (currentUser) => currentUser.id !== props.id
        );
        props.setUsers(modifiedUsers);
      })
      .catch((err) => console.log(err));

    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="text-center h4">
        <strong>Are you sure?</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
