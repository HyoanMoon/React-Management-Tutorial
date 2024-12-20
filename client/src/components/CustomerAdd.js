import React, { useState } from "react";

import axios from "axios";

const CustomerAdd = ({ fetchData }) => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer()
      .then((response) => {
        console.log("response", response);
        fetchData();
        resetForm();
      })
      .catch((error) => console.error("Error adding customer:", error));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") setUserName(value);
    if (name === "birthday") setBirthday(value);
    if (name === "gender") setGender(value);
    if (name === "job") setJob(value);
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  const resetForm = () => {
    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h1>Add Customer</h1>
        Profile image:{" "}
        <input
          type="file"
          name="image"
          value={fileName}
          onChange={handleFileChange}
        />{" "}
        <br />
        Name:{" "}
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleValueChange}
        />{" "}
        <br />
        DoB:{" "}
        <input
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleValueChange}
        />{" "}
        <br />
        Gender:{" "}
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={handleValueChange}
        />{" "}
        <br />
        Job:{" "}
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleValueChange}
        />{" "}
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CustomerAdd;
