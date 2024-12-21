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

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { styled, alpha} from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [customers, setCustomers] = useState([]); // 초기값 빈 배열
  const [completed, setCompleted] = useState(0);
  const cellList = [
    "Number",
    "Profile",
    "Name",
    "DOB",
    "Gender",
    "Job",
    "Setting",
  ];

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

  const theme = createTheme();

  const rootStyles = {
    width: "100%",
    minWidth: 1080,
  };
  const paper = {
    marginLeft: theme.spacing(2), // 2 * 8px = 16px
    marginRight: theme.spacing(2),
  };
  const tableHead = {
    fontSize: "1.0rem",
  };
  const menu = {
    marginTop: theme.spacing(2), // 2 * 8px = 16px
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={rootStyles}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Customer Management System
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Box sx={menu}>
          <CustomerAdd fetchData={fetchData} />
        </Box>
        <Paper sx={paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map((list) => {
                  return <TableCell sx={tableHead}>{list}</TableCell>;
                })}
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
