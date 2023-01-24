import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const SubComponent = ({ item, getApiData }) => {
  const [editUserInfo, setEditUserInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(null);

  const handleEditUserInfo = async (e) => {
    setEditUserInfo({ ...editUserInfo, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    getApiData();
  };

  const handleEditUserCall = async (id) => {
    await axios.put(`http://localhost:3000/posts/${id}`, editUserInfo);
    getApiData();
    setIsEdit(!isEdit);
    setValue(null);
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div>
      {isEdit ? (
        <div>
          <h3>First Name : {item.firstName}</h3>
          <TextField
            id="standard-basic"
            label="Edit first name"
            variant="standard"
            type="text"
            onChange={handleEditUserInfo}
            name="firstName"
            value={value}
          />
          <h3>Last Name : {item.lastName}</h3>
          <TextField
            id="standard-basic"
            label="Edit last name"
            variant="standard"
            type="text"
            onChange={handleEditUserInfo}
            name="lastName"
            value={value}
          />
          <br />
          <Button
            variant="contained"
            sx={{ m: 1 }}
            color="success"
            onClick={() => handleEditUserCall(item.id)}
          >
            Save
          </Button>
        </div>
      ) : (
        <div>
          <h3>First Name : {item.firstName}</h3>
          <h3>Last Name : {item.lastName}</h3>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            color="error"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </Button>
        </div>
      )}
      <Button onClick={handleIsEdit} variant="contained" color="primary"
            sx={{ m: 1 }}>{isEdit ? 'cancel' : 'Edit'}</Button>
    </div>
  );
};

export default SubComponent;
