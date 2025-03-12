import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-4">
      <h2>Welcome to Customer Management</h2>
      <nav>
        <ul>
          <li>
            <Link to="/add-customer">Add Customer</Link>
          </li>
          <li>
            <Link to="/customer-list">Customer List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;