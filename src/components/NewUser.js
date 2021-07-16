import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function NewUser(props) {
  const [formData, updateFormData] = useState({});
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
      .post("https://gorest.co.in/public-api/users", form, { headers })
      .then((response) => {
        console.log(response.data);
        alert("New user added!");
      })
      .then(() => console.log("Data Posted"))
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
              placeholder="User Name"
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
              placeholder="Email"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              className="custom-select"
              onChange={handleChange}
              required
            >
              <option selected value="">
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group form-check">
            <input
              name="status"
              type="checkbox"
              className="form-check-input"
              onChange={handleChange}
            ></input>
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
