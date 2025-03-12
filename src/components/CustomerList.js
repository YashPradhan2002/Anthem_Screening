import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`${config.apiUrl}customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>Customer List</h3>
      <Link to="/new" className="btn btn-primary mb-3">
        New Customer
      </Link>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Membership</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>
                {c.firstName} {c.lastName}
              </td>
              <td>{c.email}</td>
              <td>{c.contactNumber}</td>
              <td>{c.membershipId?.name}</td>
              <td>{c.status}</td>
              <td>
                <Link to={`/edit/${c._id}`} className="btnn btn-primary btn-sm">
                  Edit
                </Link>
                <button onClick={() => handleDelete(c._id)} className="btnn btn-danger btn-sm ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;