import React, { useState, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function ShowUserModal(props) {
  const [loading, setLoading] = useState(false);
  const [id] = useState(props.id);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://gorest.co.in/public-api/users/${id}`
      );
      setUser(res.data.data);
      setLoading(false);
    };

    getUser();
  }, [id]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          "Loading..."
        ) : (
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">ID</div>
                <div className="col">{user.id}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">Name</div>
                <div className="col">{user.name}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">Email</div>
                <div className="col">{user.email}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">Gender</div>
                <div className="col">{user.gender}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">Status</div>
                <div className="col">{user.status}</div>
              </div>
            </li>
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
