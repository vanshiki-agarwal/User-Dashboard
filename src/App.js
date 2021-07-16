import "./App.css";
import { useState } from "react";
import Users from "./components/Users";
import NewUser from "./components/NewUser";

const App = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="App">
      <div className="container px-0">
        <div className="my-4 d-flex justify-content-end">
          <div
            onClick={() => setModalShow(true)}
            className="btn-flip"
            data-back="+"
            data-front="New User"
          ></div>
        </div>

        <NewUser show={modalShow} onHide={() => setModalShow(false)} />
        <div className="row my-2 table-header">
          <div className="col text-center">
            <strong>ID</strong>
          </div>
          <div className="col text-center">
            <strong>Name</strong>
          </div>
          <div className="col text-center">
            <strong>Actions</strong>
          </div>
        </div>
      </div>

      <Users />
    </div>
  );
};

export default App;
