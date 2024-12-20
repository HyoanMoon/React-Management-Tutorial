import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from "@mui/material";

function App() {
  const [customers, setCustomers] = useState([]); // 초기값 빈 배열
  const [completed, setCompleted] = useState(0);

  const progress = () => {
    setCompleted((prevCompleted) =>
      prevCompleted >= 100 ? 0 : prevCompleted + 1
    );
  };

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(progress, 20);
    return () => clearInterval(timer); // Cleanup
  }, []);

  // API 호출
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/customers");
  //       const res = await response.json();
  //       setCustomers(res); // 테스트 후 활성화
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/customers");
      const res = await response.json();
      setCustomers(res); // 테스트 후 활성화
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paperStyles = {
    width: "100%",
    marginTop: 3,
    overflowX: "auto",
  };

  const tableStyles = {
    minWidth: 1080,
  };

  return (
    <div>
      <Paper sx={paperStyles}>
        <Table sx={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell>Num</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Setting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <Customer
                  key={customer.id}
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customer.gender}
                  job={customer.job}
                  fetchData={fetchData}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    sx={{ margin: 2 }}
                    variant="determinate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd fetchData={fetchData} />
    </div>
  );
}

export default App;
