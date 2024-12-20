import React from "react";
import { TableRow, TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

const Customer = ({ id, image, name, birthday, gender, job, fetchData }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <img src={image} alt="profile" className="profile-image" />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{birthday}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{job}</TableCell>
      <TableCell>
        <CustomerDelete fetchData={fetchData} id={id} />
      </TableCell>
    </TableRow>
  );
};

export default Customer;
