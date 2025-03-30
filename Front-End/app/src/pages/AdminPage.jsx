import React, { useState, useEffect } from "react";
import "./AdminPage.css";
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetching data (Replace with your API calls)
    setUsers([
      { id: 1, role: "admin", name: "Admin User", email: "admin@example.com" },
    ]);
    setCustomers([
      { id: 1, name: "John Doe", phone: "123456789", city: "Colombo" },
    ]);
    setSuppliers([
      { id: 1, name: "ABC Suppliers", contact: "987654321", location: "Kandy" },
    ]);
    setCategories([{ id: 1, name: "Electronics", description: "Gadgets" }]);
    setProducts([
      {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        stock: 10,
        price: 150000,
      },
    ]);
    setOrders([{ id: 1, customer: "John Doe", status: "Pending", total: 5000 }]);
    setPayments([{ id: 1, order: 1, amount: 5000, status: "Pending" }]);
  }, []);

  return (
    <div className="admin-container">
      <h1 className="title">Admin Dashboard</h1>
      
      {/* Users Table */}
      <Table title="Users" headers={["ID", "Role", "Name", "Email"]} data={users} />

      {/* Customers Table */}
      <Table title="Customers" headers={["ID", "Name", "Phone", "City"]} data={customers} />

      {/* Suppliers Table */}
      <Table title="Suppliers" headers={["ID", "Name", "Contact", "Location"]} data={suppliers} />

      {/* Categories Table */}
      <Table title="Categories" headers={["ID", "Name", "Description"]} data={categories} />

      {/* Products Table */}
      <Table title="Products" headers={["ID", "Name", "Category", "Stock", "Price"]} data={products} />

      {/* Orders Table */}
      <Table title="Orders" headers={["ID", "Customer", "Status", "Total"]} data={orders} />

      {/* Payments Table */}
      <Table title="Payments" headers={["ID", "Order", "Amount", "Status"]} data={payments} />
    </div>
  );
};

// Reusable Table Component
const Table = ({ title, headers, data }) => (
  <div className="table-container">
    <h2>{title}</h2>
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPage;
