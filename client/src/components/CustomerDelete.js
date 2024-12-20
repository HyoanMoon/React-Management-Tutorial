import React from "react";

const CustomerDelete = ({ fetchData, id }) => {
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
      <button
        onClick={() => {
          deleteCustomer(id);
        }}
      >
        {" "}
        Delete
      </button>
    </div>
  );
};

export default CustomerDelete;
