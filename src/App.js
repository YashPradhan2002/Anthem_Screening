import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import NewCustomer from './pages/NewCustomer';
import EditCustomer from './pages/EditCustomer';

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/new" element={<NewCustomer />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
      </Routes>
    </div>
  );
};

export default App;