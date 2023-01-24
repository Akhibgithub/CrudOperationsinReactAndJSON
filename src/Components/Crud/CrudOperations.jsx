import React, { useEffect, useState } from "react";
import "./crudoperations.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import SubComponent from "./SubComponent";

const CrudOperations = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const handleUserInfo = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getApiData = async () => {
    const resp = await axios.get(`http://localhost:3000/posts`);
    setData(resp.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/posts`, user);
    getApiData();
    document.getElementById("input").value = "";
    document.getElementById("input1").value = "";
  };

  return (
    <div className="crud-main-container">
      <div className="crud-sub-container">
        <TextField
          id="input"
          label="Firstname"
          variant="outlined"
          name="firstName"
          onChange={handleUserInfo}
        />
        <TextField
          id="input1"
          label="Lastname"
          variant="outlined"
          name="lastName"
          onChange={handleUserInfo}
        />
        <Button variant="contained" onClick={postData}>
          Post
        </Button>
      </div>
      <div className="content-container">
        {data.map((item, index) => {
          return (
            <SubComponent key={index} item={item} getApiData={getApiData} />
          );
        })}
      </div>
    </div>
  );
};

export default CrudOperations;
