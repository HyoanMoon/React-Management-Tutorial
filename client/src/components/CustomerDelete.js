import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomerDelete = ({ fetchData, id }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          console.error("Failed to delete customer");
        }
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          handleClickOpen();
        }}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Are you sure you want to delete this customer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleteCustomer(id)}
          >
            Delete
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
