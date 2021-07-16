import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import User from "./User";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const headers = {
        Authorization:
          "Bearer 7f9912c5ee3bf743fb5e548ba9b9ca45444351294ebd7c50c5841799146741d8",
        "Content-type": "application/json",
      };
      setLoading(true);
      const res = await axios.get(
        `https://gorest.co.in/public-api/users?page=${currentPage}`,
        // { params: { page: currentPage } },
        { headers }
      );
      setUsers(res.data.data);
      setPageCount(res.data.meta.pagination.pages);
      setLoading(false);
    };
    getUsers();
  }, [currentPage]);

  const currentPageData = users.map((user) => (
    <User
      key={user.id}
      number={user.id}
      name={user.name}
      email={user.email}
      gender={user.gender}
      status={user.status}
      setUsers={setUsers}
      users={users}
    />
  ));
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage + 1);
  };
  return (
    <div className="container">
      {loading ? "Loading..." : currentPageData}
      <div className="paginate-container">
        <ReactPaginate
          previousLabel={"<<<"}
          nextLabel={">>>"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </div>
  );
};

export default Users;

//token: 7f9912c5ee3bf743fb5e548ba9b9ca45444351294ebd7c50c5841799146741d8
