import React, { useState } from "react";
import "./User.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function EditUserModal(props) {
  const [formData, updateFormData] = useState({
    name: props.name,
    email: props.email,
    gender: props.gender,
    status: props.status,
  });
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
    const form = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      status: formData.status === "on" ? "active" : "inactive",
    };
    const headers = {
      Authorization:
        "Bearer 7f9912c5ee3bf743fb5e548ba9b9ca45444351294ebd7c50c5841799146741d8",
      "Content-type": "application/json",
    };
    axios
      .put(`https://gorest.co.in/public-api/users/${props.id}`, form, {
        headers,
      })
      .then((response) => console.log(response.data))
      .then(() => console.log("Data Updated"))
      .then(() => {
        let newUsers = props.users.map((currentUser) => {
          if (currentUser.id === props.id) {
            return { ...form, id: props.id };
          }
          return currentUser;
        });
        props.setUsers(newUsers);
      })
      .catch((err) => console.log(err));

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Gender</label>

            {formData.gender === "male" ? (
              <select
                name="gender"
                className="custom-select"
                onChange={handleChange}
                required
              >
                {" "}
                <option defaultValue value="male">
                  Male
                </option>
                <option value="female">Female</option>
              </select>
            ) : (
              <select
                name="gender"
                className="custom-select"
                onChange={handleChange}
                required
              >
                {" "}
                <option value="male">Male</option>
                <option defaultValue value="female">
                  Female
                </option>
              </select>
            )}
          </div>
          <div className="form-group form-check">
            {formData.status === "active" ? (
              <input
                checked
                name="status"
                type="checkbox"
                className="form-check-input"
                onChange={handleChange}
              ></input>
            ) : (
              <input
                name="status"
                type="checkbox"
                className="form-check-input"
                onChange={handleChange}
              ></input>
            )}
            <label className="form-check-label">Status</label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
