import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customer";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function App() {
  const [customers, setCustomers] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/customers");
        const res = await response.json();
        setCustomers(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        marginTop: 3,
        overflowX: "auto",
      }}
    >
      <Table
        sx={{
          minWidth: 1080,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Num</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Job</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => {
            return (
              <Customer
                key={customer.id}
                id={customer.id}
                image={customer.image}
                name={customer.name}
                birthday={customer.birthday}
                gender={customer.gender}
                job={customer.job}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
