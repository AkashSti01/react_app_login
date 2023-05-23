import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Decleare the limit value
let limit = [5, 10, 15, 20];

// Decleare status variable for filter data according to status
let statusFilter = ["All", "Active", "Deactive"];

// Decleare initial key for seach functionality
let initialkeysearch = {
  keysearch: "",
};

// Function is decleare for calculating the page number
const calculatepagenumber = (total, limit) => {
  let page = [];
  for (let i = 1; i <= parseInt(total) / limit; i++) {
    page.push(i);
  }
  if (parseInt(total) % limit !== 0) page.push(page.length + 1);
  return page;
};
const UserDetail = () => {
  // All states are decleared here
  const [userDatas, setuserData] = useState();
  const [total, setTotal] = useState(0);
  const [activepage, setactivePage] = useState(1);
  const [selectLimitvalue, setselectLimit] = useState(5);
  const [textsearch, settextSearch] = useState(initialkeysearch);
  const [selectstatusvalue, setselectstatusvalue] = useState("All");
  const [show, setShow] = useState(true);
  const [userDetail, setUserid] = useState(null);

  // Function is decleare for get id of selected user from userdata table
  const handleRowClick = (user) => {
    setUserid(user);
  };

  // Function is decleare for update user data
  const edituserData = () => {
    setShow(false);
  };
  // Function is decleare for update search functionality onclick of search button
  const searchuserData = (e) => {
    e.preventDefault();
    userData(textsearch, selectstatusvalue);
  };

  const Fun = () => {};
  // Function is decleare for update search functionality
  const selectChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    settextSearch({ ...textsearch, [name]: value });
  };

  // Function is decleare for update limit
  const selectLimit = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setselectLimit(Number(value));
    setactivePage(1);
  };

  // Function is decleare for update status
  const selectStatus = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setselectstatusvalue(String(value));
  };

  // Api is calling here
  const userData = async (value, status) => {
    try {
      const response = await axios.post("http://localhost:8085/user/getusers", {
        page: activepage,
        limit: selectLimitvalue,
        keyword: value ? value : "",
        status: status ? status : selectstatusvalue,
      });
      setuserData(response.data.data);
      setTotal(response.data.count);
    } catch (error) {
      console.log("err", error);
    }
  };

  // Useeffect is call here to render the user data after page load
  useEffect(() => {
    userData();
  }, [activepage, selectLimitvalue, show]);

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-sm-6">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="keysearch"
              onChange={(e) => selectChange(e)}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={(e) => searchuserData(e)}
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-sm-6">
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "120px" }}
            value={selectstatusvalue}
            onChange={selectStatus}
            onClick={(e) => searchuserData(e)}
          >
            {statusFilter.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive my-3">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Sr.No</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>JOb Type</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userDatas &&
              userDatas.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)}>
                  <td>{(activepage - 1) * selectLimitvalue + index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.jobtype}</td>
                  <td>{item.age}</td>
                  <td
                    className={`${
                      item.status === "Active"
                        ? "bg-success text-light"
                        : "bg-danger text-light"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square text-success mx-3"
                      onClick={(e) => edituserData(e)}
                    ></i>
                    <i className="fa-solid fa-trash text-danger mx-3"></i>
                    <i></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-sm">
          <select
            className="form-select justify-content-end"
            aria-label="Default select example"
            style={{ width: "70px" }}
            value={selectLimitvalue}
            onChange={selectLimit}
          >
            {limit.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {activepage !== 1 && (
                <li className="page-item">
                  <Link
                    className="page-link"
                    to="#"
                    aria-label="Previous"
                    onClick={() => setactivePage(activepage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
              )}
              {calculatepagenumber(total, selectLimitvalue).map((item) => (
                <li
                  className={`page-item ${item === activepage ? "active" : ""}`}
                  key={item}
                >
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => setactivePage(item)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              {activepage !==
                calculatepagenumber(total, selectLimitvalue).length && (
                <li className="page-item">
                  <Link
                    className="page-link"
                    to="#"
                    aria-label="Next"
                    onClick={() => setactivePage(activepage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
