import React, { useState } from "react";
import "./User.css";
import EditUserModal from "./EditUser";
import DeleteUserModal from "./DeleteUser";
import ShowUserModal from "./ShowUser";

const User = ({ number, name, email, gender, status, setUsers, users }) => {
  const [userModalShow, setUserModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  return (
    <div className="row userdiv mb-2 p-2">
      <div className="col">{number}</div>
      <div className="col">{name}</div>
      <div className="col">
        <ul className="d-flex actions justify-content-around align-items-center mb-0">
          <li>
            <button
              onClick={() => setUserModalShow(true)}
              type="button"
              className="btn btn-outline-info btn-sm"
            >
              Show
            </button>
            <ShowUserModal
              id={number}
              show={userModalShow}
              onHide={() => setUserModalShow(false)}
            />
          </li>
          <li>
            <button
              onClick={() => setEditModalShow(true)}
              type="button"
              className="btn btn-outline-primary btn-sm"
            >
              Edit
            </button>
            <EditUserModal
              id={number}
              name={name}
              email={email}
              gender={gender}
              status={status}
              setUsers={setUsers}
              users={users}
              show={editModalShow}
              onHide={() => setEditModalShow(false)}
            />
          </li>
          <li>
            <button
              onClick={() => setDeleteModalShow(true)}
              type="button"
              className="btn btn-outline-danger btn-sm"
            >
              Delete
            </button>
            <DeleteUserModal
              id={number}
              setUsers={setUsers}
              users={users}
              show={deleteModalShow}
              onHide={() => setDeleteModalShow(false)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
